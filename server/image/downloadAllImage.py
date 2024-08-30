import requests
import logging
import zipfile
import io
import os

def download_images_to_zip(data_url, zip_filename):
    try:
        # Create an in-memory ZIP file
        with io.BytesIO() as zip_buffer:
            with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
                for i, url in enumerate(data_url):
                    try:
                        response = requests.get(url)
                        response.raise_for_status()  # Check for HTTP errors

                        # Get the image name from the URL
                        image_name = os.path.basename(url)
                        if not image_name:
                            image_name = f'image_{i}.jpg'  # Default name if the URL doesn't contain one

                        # Add the image to the ZIP file
                        zip_file.writestr(image_name, response.content)
                        logging.info(f"Downloaded and added {image_name} to ZIP.")
                    
                    except Exception as e:
                        logging.error(f"Failed to download image from {url}: {e}")

            # Save the in-memory ZIP to a file
            with open(zip_filename, 'wb') as f:
                f.write(zip_buffer.getvalue())
            logging.info(f"ZIP file {zip_filename} created successfully.")
    
    except Exception as e:
        logging.error(f"An error occurred while creating the ZIP file: {e}")