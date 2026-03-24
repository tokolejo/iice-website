import requests
from bs4 import BeautifulSoup
import json
import time

def scrape_english_news():
    base_url = "https://iice.ge/en/news/"
    print(f"Fetching {base_url}...")
    try:
        response = requests.get(base_url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"Error fetching base URL: {e}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    
    # In elementor, posts are usually in articles or specific widgets
    # We can find all links that are within post wrappers, or just all h3 > a for typical Elementor posts
    # Looking at the HTML structure typically, they are inside elements with class like "elementor-post__title"
    
    post_links = []
    
    # Try looking for elementor post titles
    title_tags = soup.find_all(True, class_=lambda c: c and 'elementor-post__title' in c)
    if not title_tags:
         # Fallback: look for typical WP loop links inside an elementor posts widget
         links = soup.select('.elementor-posts-container a.elementor-post__thumbnail__link')
         for a in links:
             if a.get('href') not in [p['url'] for p in post_links]:
                post_links.append({"url": a.get('href')})
    else:
        for tag in title_tags:
            aTag = tag.find('a')
            if aTag and aTag.get('href'):
                url = aTag.get('href')
                if url not in [p['url'] for p in post_links]:
                    post_links.append({"title": aTag.text.strip(), "url": url})

    # If both fail, let's grab all unique article links looking like WP perma links
    if not post_links:
        for article in soup.find_all('article'):
            aTag = article.find('a')
            if aTag and aTag.get('href') and '/en/' in aTag.get('href'):
               url = aTag.get('href')
               if url not in [p['url'] for p in post_links]:
                   post_links.append({"url": url})
                   
    print(f"Found {len(post_links)} links to scrape.")
    
    results = []
    for idx, post in enumerate(post_links[:15]): # Only top 15 corresponding
        url = post['url']
        print(f"Scraping {idx+1}: {url}")
        
        try:
            res = requests.get(url, timeout=10)
            res.raise_for_status()
            s = BeautifulSoup(res.text, 'html.parser')
            
            # The title is usually h1 or h2
            title_el = s.find('h1', class_=lambda c: c and 'elementor-heading-title' in c) 
            if not title_el:
                title_el = s.find('h1')
                
            title = title_el.text.strip() if title_el else "Unknown Title"
            
            # The content is usually in inner containers
            # We want to extract raw HTML of the inner post content, typically elementor-widget-theme-post-content or inside article 
            content_div = s.find('div', class_=lambda c: c and 'elementor-widget-theme-post-content' in c)
            if not content_div:
                content_div = s.find('div', class_=lambda c: c and 'elementor-widget-text-editor' in c)
            if not content_div:
                 content_div = s.find('article')
            
            content = ""
            desc = ""
            if content_div:
                # To make it beautiful, we get the html of inner text-editor
                html_snippet = str(content_div)
                content = html_snippet
                desc = content_div.get_text(separator=' ', strip=True)[:200] + "..."
                
            results.append({
                "titleEn": title,
                "contentEn": content,
                "descriptionEn": desc
            })
            time.sleep(1) # be nice to the server
        except Exception as e:
            print(f"Failed to scrape {url}: {e}")
            
    with open('en_translations.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
        
    print("Done! Saved to en_translations.json")

scrape_english_news()
