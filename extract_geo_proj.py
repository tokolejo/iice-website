import docx

try:
    doc = docx.Document(r"C:\Users\tokol\Downloads\GEO მნიშვნელოვან პროექტებში - implemented ინდუსტრიასთან თანამშრომლობით.docx")
    text = "\n".join([p.text for p in doc.paragraphs])
    with open("extracted_5.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Success")
except Exception as e:
    print("Error:", e)
