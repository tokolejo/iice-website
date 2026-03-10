import os
import re
import json
import html
from urllib.parse import urlparse, parse_qs, unquote
from urllib.request import Request, urlopen

# Paths
JS_FILE_PATH = 'src/data/newsData.js'
OUTPUT_DIR = 'public/images/news'

# Create output directory if it doesn't exist
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def sanitize_filename(url):
    """Generates a safe filename from a URL."""
    path = urlparse(url).path
    filename = os.path.basename(path)
    filename = filename.split('?')[0]
    filename = re.sub(r'-\d+x\d+', '', filename)
    filename = filename.replace('-scaled', '')
    # Handle non-ascii filenames from URL encoding
    filename = unquote(filename)
    # Remove characters that might be problematic in filenames
    filename = re.sub(r'[^\w\d\.-]', '_', filename)
    if not filename:
        filename = f"file_{abs(hash(url)) % 10000}"
    # Truncate if too long
    if len(filename) > 100:
        name, ext = os.path.splitext(filename)
        filename = name[:90] + ext
    return filename

def download_file(url, local_path):
    """Downloads a file from a URL to a local path."""
    if os.path.exists(local_path):
        return True
    
    try:
        print(f"Downloading: {url}")
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urlopen(req, timeout=20) as response, open(local_path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

def localize_string(s, url_cache):
    """Finds URLs in a string and replaces them with local paths."""
    if not s or not isinstance(s, str):
        return s
    
    # Decode HTML entities first to handle &#038; etc in URLs
    s_decoded = html.unescape(s)
    
    # Find all http/https URLs
    # Modified regex to be more robust for complex URLs
    urls = re.findall(r'https?://[^\s"\',<>]+', s_decoded)
    for url in sorted(list(set(urls)), key=len, reverse=True):
        if url in url_cache:
            s = s.replace(url, url_cache[url])
            s = s.replace(html.escape(url), url_cache[url])
            continue
            
        target_url = url
        # Handle specific WordPress PDF viewer URLs
        if 'admin-ajax.php' in url and 'action=embedpress_pdf_viewer' in url:
            print(f"Found PDF viewer URL: {url}")
            parsed = urlparse(url)
            qs = parse_qs(parsed.query)
            if 'url' in qs:
                target_url = qs['url'][0]
                print(f" -> Extracted nested URL: {target_url}")
            else:
                print(" -> No 'url' parameter found in query string.")

        filename = sanitize_filename(target_url)
        if '.' not in filename:
            ext = '.jpg'
            if 'pdf' in target_url.lower(): ext = '.pdf'
            elif 'png' in target_url.lower(): ext = '.png'
            filename += ext
        
        local_rel_path = f"/images/news/{filename}"
        local_full_path = os.path.join(OUTPUT_DIR, filename)
        
        if download_file(target_url, local_full_path):
            url_cache[url] = local_rel_path
            s = s.replace(url, local_rel_path)
            s = s.replace(html.escape(url), local_rel_path)
            
    return s

def process_data():
    if not os.path.exists(JS_FILE_PATH):
        print(f"File not found: {JS_FILE_PATH}")
        return

    with open(JS_FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the JSON part
    match = re.search(r'export const newsData = (\[.*\]);?', content, re.DOTALL)
    if not match:
        print("Could not find the array in the JS file.")
        return

    try:
        data = json.loads(match.group(1))
    except Exception as e:
        print(f"Failed to parse JSON: {e}")
        return
        
    url_cache = {}

    print(f"Processing {len(data)} news items...")
    for item in data:
        # Localize fields
        for field in ['imageUrl', 'description', 'descriptionEn', 'content']:
            if field in item:
                # Handle placeholders
                if item[field] == "/images/news-placeholder.jpg":
                    # Keep as is, it's already local (but absolute path)
                    pass
                else:
                    item[field] = localize_string(item[field], url_cache)
        
        # Localize images array
        if 'images' in item and isinstance(item['images'], list):
            item['images'] = [localize_string(img, url_cache) for img in item['images']]

    # Write back
    with open(JS_FILE_PATH, 'w', encoding='utf-8') as f:
        f.write('export const newsData = ')
        json.dump(data, f, ensure_ascii=False, indent=4)
        f.write(';\n')

    print(f"Successfully localized {len(url_cache)} unique files.")

if __name__ == "__main__":
    process_data()
