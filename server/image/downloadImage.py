from dotenv import load_dotenv
import requests
import os

# Load environment variables from .env file
load_dotenv()

req = os.getenv('API_REQ')
url = f"{req}/2022/22_11_4880.jpg"

response = requests.get(url)

image_data = response.content
with open('downloaded_image.jpg', 'wb') as file:
    file.write(image_data)
print("Gambar berhasil disimpan sebagai downloaded_image.jpg")