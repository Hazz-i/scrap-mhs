from flask import Flask, jsonify, request, send_file
from dotenv import load_dotenv
from flask_cors import CORS
import requests
import os
import io
from zipfile import ZipFile

from image.showImage import get_all_image 
from image.downloadImage import download_single_image 

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS = CORS(app, origins="*")

@app.route('/image/<angkatan>/<fakultas>/<nim>', methods=['GET'])
def get_img_url(angkatan, fakultas, nim):
    try:
        start = nim.split("-")[0]
        end = nim.split("-")[1]
        nim_angkatan = angkatan[2:4]
        req = os.getenv('API_REQ')
        result = []

        nim_length = len(start)

        while int(start) <= int(end):
            formatted_start = str(start).zfill(nim_length)
            url = f"{req}/{angkatan}/{nim_angkatan}_{fakultas}_{formatted_start}.jpg"
            print(f"Processing NIM: {formatted_start} - URL: {url}")

            data = get_all_image(url)
            if data:
                result.extend(data)
            else:
                print(f"No image found for NIM: {formatted_start}")

            start = str(int(start) + 1).zfill(nim_length)  

        return jsonify({'status': "success", 'data': result})

    except Exception as e:
        return jsonify({'status': "fail", 'message': str(e)}), 500


@app.route('/image/download-image', methods=['POST'])
def download_single_image(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.content
    else:
        raise Exception(f"Failed to download image from {url}")

@app.route('/image/download_zip_from_urls', methods=['POST'])
def download_zip_from_urls():
    try:
        data = request.json 
        urls = data.get('urls', [])

        if not urls:
            return jsonify({'status': "fail", 'message': "No URLs provided"}), 400

        # Membuat file ZIP secara in-memory
        zip_buffer = io.BytesIO()
        with ZipFile(zip_buffer, 'w') as zip_file:
            for index, url in enumerate(urls):
                filename = f"image_{index + 1}.jpg"
                
                try:
                    # Unduh gambar dan tambahkan ke dalam file ZIP
                    img_data = download_single_image(url)
                    zip_file.writestr(filename, img_data)
                except Exception as e:
                    print(f"Failed to download {url}: {str(e)}")
        
        # Memindahkan pointer ke awal buffer
        zip_buffer.seek(0)

        return send_file(
            zip_buffer,
            mimetype='application/zip',
            as_attachment=True,
            download_name='images.zip'
        )

    except Exception as e:
        return jsonify({'status': "fail", 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host=os.getenv('FLASK_RUN_HOST'), port=os.getenv('FLASK_RUN_PORT'))
