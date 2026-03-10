import os
import re
import json
from pypdf import PdfReader

files = [
    r"c:\Users\tokol\OneDrive\Desktop\PROJECT\iice-website\public\staff\applied-chemistry\Nikoloz Nioradze_Bio_GEO.pdf",
    r"c:\Users\tokol\OneDrive\Desktop\PROJECT\iice-website\public\staff\applied-chemistry\Nikoloz Nioradze_Bio_ENG.pdf"
]

def extract_links(filepath):
    text = ""
    try:
        reader = PdfReader(filepath)
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
    
    url_pattern = re.compile(r'(https?://[^\s\]\)\>]+)')
    urls = url_pattern.findall(text)
    return list(set([u.strip(".,;") for u in urls]))

results = {}
for f in files:
    results[os.path.basename(f)] = extract_links(f)

print(json.dumps(results, indent=4))
