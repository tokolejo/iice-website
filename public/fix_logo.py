from PIL import Image
import os

path = r"c:\Users\tokol\OneDrive\Desktop\PROJECT\iice-website\public\logo.png"
backup_path = r"c:\Users\tokol\OneDrive\Desktop\PROJECT\iice-website\public\logo_backup.png"

# Load image
img = Image.open(path).convert("RGBA")
pixels = img.load()
width, height = img.size

# Backup
img.save(backup_path)

# Threshold for "black"
# We want to catch the outer text which is black, but not the purple/gold/white.
# Purple is around (46, 13, 66) -> Some values are low but it's clearly purple.
# Gold is around (255, 215, 0) -> High values.
# Pure black is (0,0,0).

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if a > 0: # Not transparent
            # If it's very dark (black text)
            if r < 80 and g < 80 and b < 80:
                # Change to white
                pixels[x, y] = (255, 255, 255, a)

# Save back
img.save(path)
print("Logo updated successfully.")
