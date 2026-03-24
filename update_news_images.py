import os
import shutil
import glob

def move_images():
    brain_dir = r"c:\Users\tokol\.gemini\antigravity\brain\e8493267-bda7-488f-8ec5-971249f8717d"
    dest_dir = r"c:\Users\tokol\OneDrive\Desktop\PROJECT\iice-website\public\images\news"

    files = glob.glob(os.path.join(brain_dir, "media__1774253772*.jpg"))
    files.sort()

    for i, f in enumerate(files, 1):
        dest = os.path.join(dest_dir, f"energy-materials-{i}.jpg")
        shutil.copy2(f, dest)
        print(f"Copied uploaded image {i} to {dest}")

if __name__ == "__main__":
    move_images()
