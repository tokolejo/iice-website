import os
import re
import json
from pathlib import Path
from pypdf import PdfReader
import docx

DIRECTORY = r"c:\Users\tokol\OneDrive\Desktop\PROJECT\iice-website\public\staff"

def get_recent_files(directory, limit=30):
    files = []
    for root, _, filenames in os.walk(directory):
        for filename in filenames:
            if filename.lower().endswith(('.pdf', '.docx', '.doc')):
                path = os.path.join(root, filename)
                files.append((path, os.path.getmtime(path)))
    files.sort(key=lambda x: x[1], reverse=True)
    return [f[0] for f in files[:limit]]

def extract_text(filepath):
    text = ""
    try:
        if filepath.lower().endswith('.pdf'):
            reader = PdfReader(filepath)
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        elif filepath.lower().endswith('.docx'):
            doc = docx.Document(filepath)
            for para in doc.paragraphs:
                text += para.text + "\n"
    except Exception as e:
        pass
    return text

def parse_files():
    recent_files = get_recent_files(DIRECTORY, 30)
    url_pattern = re.compile(r'(https?://[^\s\]\)\>]+)')
    email_pattern = re.compile(r'([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)')
    
    results = {}
    
    for filepath in recent_files:
        text = extract_text(filepath)
        if not text.strip():
            continue
            
        urls = url_pattern.findall(text)
        emails = email_pattern.findall(text)
        
        unique_urls = list(set([u.strip(".,;") for u in urls]))
        unique_emails = list(set([e.lower() for e in emails]))
        
        if unique_urls or unique_emails:
            results[os.path.basename(filepath)] = {
                "dir": os.path.dirname(filepath).split(os.sep)[-1],
                "urls": unique_urls,
                "emails": unique_emails
            }
            
    with open("cv_data_extracted.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    parse_files()
