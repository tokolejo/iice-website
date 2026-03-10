import re

f_path = 'src/data/newsData.js'
with open(f_path, 'r', encoding='utf-8') as f:
    content = f.read()

titles = re.findall(r'"title":\s*"(.*?)"', content)
for i, title in enumerate(titles):
    print(f"{i+1}. {title}")
