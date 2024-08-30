import requests
import logging


def get_all_image(url):
    try:
        response = requests.get(url)
        data_url = []

        if 'image' in response.headers.get('Content-Type', ''):
            data_url.append(url)
    except Exception as e:
        logging.error(f"Error processing entry: {e}")

    return data_url