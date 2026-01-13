from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
from collections import Counter

def get_dominant_colors(image_path, k=8):
    try:
        # Load image
        image = Image.open(image_path)
        image = image.convert('RGB')
        
        # Resize to speed up
        image = image.resize((150, 150))
        
        # Convert to numpy array
        np_image = np.array(image)
        pixels = np_image.reshape(-1, 3)
        
        # Use KMeans
        kmeans = KMeans(n_clusters=k)
        kmeans.fit(pixels)
        
        # Get colors
        colors = kmeans.cluster_centers_
        
        # Convert to hex
        print("Dominant Colors Found:")
        for c in colors:
            hex_code = '#{:02x}{:02x}{:02x}'.format(int(c[0]), int(c[1]), int(c[2]))
            print(f"{hex_code} (RGB: {int(c[0])}, {int(c[1])}, {int(c[2])})")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_dominant_colors("public/RootStock.jpeg")
