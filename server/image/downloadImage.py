import requests
import logging

def download_single_image(url, filename):
    try:
        response = requests.get(url)
        response.raise_for_status()

        # Save the image to a file
        with open(filename, 'wb') as file:
            file.write(response.content)
        logging.info(f"Image successfully downloaded and saved as {filename}.")
    
    except Exception as e:
        logging.error(f"Failed to download image from {url}: {e}")