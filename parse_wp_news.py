import xml.etree.ElementTree as ET
import json
import re
import os
from datetime import datetime

# Paths to the WordPress XML files
xml_files = [
    r'C:\Users\tokol\Downloads\iice.WordPress.2026-03-10.xml',
    r'C:\Users\tokol\Downloads\iice.WordPress.2026-03-10 (2).xml',
    r'C:\Users\tokol\Downloads\iice.WordPress.2026-03-10 (3).xml'
]
output_file = 'src/data/newsData.js'

# Namespaces in WordPress XML
ns = {
    'content': 'http://purl.org/rss/1.0/modules/content/',
    'wp': 'http://wordpress.org/export/1.2/',
    'excerpt': 'http://wordpress.org/export/1.2/excerpt/'
}

def clean_html(raw_html):
    """Removes HTML tags from a string."""
    if not raw_html: return ""
    cleaner = re.compile('<.*?>')
    return re.sub(cleaner, '', raw_html).strip()

def extract_images(content):
    """Extracts all image URLs from content."""
    if not content: return []
    # Match both src and srcset URLs
    urls = re.findall(r'src="([^"]+)"', content)
    # Also find URLs in galleries/captions if any
    bracket_urls = re.findall(r'\[gallery[^\]]*ids="([^"]*)"', content)
    # Note: parsing IDs to URLs would require a lookup table from 'attachment' types
    return urls

def parse_all_wp_xml():
    news_items_map = {}
    
    # First, build a map of attachments (ID to URL) to resolve gallery IDs if needed
    # But for now, the user mostly cares about what's in the content.
    
    for xml_file in xml_files:
        if not os.path.exists(xml_file):
            print(f"Skipping missing file: {xml_file}")
            continue
            
        print(f"Parsing: {os.path.basename(xml_file)}")
        try:
            tree = ET.parse(xml_file)
            root = tree.getroot()
            channel = root.find('channel')
            
            for item in channel.findall('item'):
                pt_elem = item.find('wp:post_type', ns)
                status_elem = item.find('wp:status', ns)
                if pt_elem is None or status_elem is None: continue
                
                post_type = pt_elem.text
                status = status_elem.text
                post_id = item.find('wp:post_id', ns).text
                
                # Only process news and seminars that are published
                if post_type == 'post' and status == 'publish':
                    title = item.find('title').text or ""
                    content_encoded = item.find('content:encoded', ns).text or ""
                    excerpt = item.find('excerpt:encoded', ns).text or ""
                    pub_date_raw = item.find('pubDate').text
                    
                    # Categories
                    cats = [cat.text for cat in item.findall('category') if cat.get('domain') == 'category']
                    category = 'news'
                    if any('სემინარი' in c or 'Seminars' in c for c in cats):
                        category = 'seminars'
                    
                    # Date formatting
                    try:
                        date_obj = datetime.strptime(pub_date_raw, '%a, %d %b %Y %H:%M:%S %z')
                        date_str = date_obj.strftime('%Y-%m-%d')
                    except:
                        date_str = "2025-01-01"
                    
                    # Image extraction
                    images = extract_images(content_encoded)
                    primary_image = images[0] if images else "/images/news-placeholder.jpg"
                    
                    # Description cleaning
                    description = clean_html(excerpt)
                    if not description and content_encoded:
                        description = clean_html(content_encoded)[:200] + "..."
                    
                    news_items_map[post_id] = {
                        "id": int(post_id), # Use WP ID for uniqueness
                        "category": category,
                        "date": date_str,
                        "title": title,
                        "titleEn": f"[ENG] {title}",
                        "description": description,
                        "descriptionEn": f"[ENG] {description}",
                        "content": content_encoded,
                        "contentEn": f"[ENG] Translation needed for: {title}",
                        "imageUrl": primary_image,
                        "images": list(set(images))
                    }
        except Exception as e:
            print(f"Error parsing {xml_file}: {e}")

    # Convert map to list and sort by date descending
    news_items = list(news_items_map.values())
    news_items.sort(key=lambda x: x['date'], reverse=True)
    
    # Re-assign sequential IDs for frontend consistency if desired, 
    # but using WP IDs is safer for merging. 
    # Let's keep WP IDs but ensure they are numbers.
    for i, item in enumerate(news_items):
        item['id'] = i + 1 # Re-indexing for 1...N display

    # Write to newsData.js
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('export const newsData = ')
        json.dump(news_items, f, ensure_ascii=False, indent=4)
        f.write(';\n')
    
    print(f"Successfully merged {len(news_items)} news items to {output_file}")

if __name__ == "__main__":
    parse_all_wp_xml()
