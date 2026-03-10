import xml.etree.ElementTree as ET
import os

files = [
    r'C:\Users\tokol\Downloads\iice.WordPress.2026-03-10.xml',
    r'C:\Users\tokol\Downloads\iice.WordPress.2026-03-10 (2).xml',
    r'C:\Users\tokol\Downloads\iice.WordPress.2026-03-10 (3).xml'
]

ns = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/'
}

for f_path in files:
    if not os.path.exists(f_path):
        print(f"File not found: {f_path}")
        continue
    
    print(f"\n--- Analyzing: {os.path.basename(f_path)} ---")
    try:
        tree = ET.parse(f_path)
        root = tree.getroot()
        channel = root.find('channel')
        
        post_types = {}
        items = channel.findall('item')
        print(f"Total items: {len(items)}")
        
        for item in items:
            pt_elem = item.find('wp:post_type', ns)
            pt = pt_elem.text if pt_elem is not None else "unknown"
            post_types[pt] = post_types.get(pt, 0) + 1
            
        print(f"Post Types: {post_types}")
        
        # Titles for posts/pages
        titles = [item.find('title').text for item in items if item.find('wp:post_type', ns).text in ['post', 'page']]
        if titles:
            print(f"First 10 titles: {titles[:10]}")
            
    except Exception as e:
        print(f"Error parsing {f_path}: {e}")
