import os
import docx

files = [
    r"C:\Users\tokol\Downloads\აღჭურვილობა Techno Park.doc",
    r"C:\Users\tokol\Downloads\ENG განხორციელებული.doc",
    r"C:\Users\tokol\Downloads\რეზიუმე_გ.ტ. GEO ENG.docx",
    r"C:\Users\tokol\Downloads\ელიზავეტა ცხაკაია GEO ENG.docx",
    r"C:\Users\tokol\Downloads\მაღალი ენერგიების GEO ENG.docx"
]

def extract_docx(path):
    try:
        doc = docx.Document(path)
        return "\n".join([p.text for p in doc.paragraphs])
    except Exception as e:
        return f"Error reading docx: {e}"

def extract_doc(path):
    try:
        import win32com.client
        word = win32com.client.Dispatch("Word.Application")
        word.Visible = False
        wb = word.Documents.Open(path)
        text = wb.Content.Text
        wb.Close()
        word.Quit()
        return text
    except Exception as e:
        return f"Error reading doc: {e}"

for idx, f in enumerate(files):
    print(f"\n--- Processing {os.path.basename(f)} ---")
    if f.endswith('.docx'):
        text = extract_docx(f)
    else:
        text = extract_doc(f)
    
    out_path = f"extracted_{idx}.txt"
    with open(out_path, 'w', encoding='utf-8') as out:
        out.write(text)
    print(f"Saved to {out_path}")
