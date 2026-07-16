import zipfile
import xml.etree.ElementTree as ET

docx = zipfile.ZipFile(r'D:\PROJECTS\iice-files\news\25 მაისის სემინარი.docx')
xml_content = docx.read('word/document.xml')
tree = ET.XML(xml_content)
namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
paragraphs = []
for elem in tree.iter():
    if elem.tag == '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p':
        texts = [t.text for t in elem.findall('.//w:t', namespace) if t.text]
        if texts:
            paragraphs.append(''.join(texts))

with open('extracted_news.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(paragraphs))
