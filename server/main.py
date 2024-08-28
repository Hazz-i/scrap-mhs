from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os

from image.showImage import get_all_image 

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

        while int(start) <= int(end): 
            url = f"{req}/{angkatan}/{nim_angkatan}_{fakultas}_{start}.jpg"
            print(f"Processing NIM: {start} - URL: {url}") 

            data = get_all_image(url)
            if data:
                result.extend(data)
            else:
                print(f"No image found for NIM: {start}") 

            start = str(int(start) + 1) 

        return jsonify({'status': "success", 'data': result})

    except Exception as e:
        return jsonify({'status': "fail", 'message': str(e)}), 500

# @app.route('/api/neko-stream/search=<anime>', methods=['GET'])
# def search(anime):
#     try:
#         animeSearch = anime.replace(" ", "+")
#         if not anime:
#             return jsonify({'success': "fail", 'message': "Invalid parameters."}), 400

#         url = f"https://otakudesu.cloud/?s={animeSearch}&post_type=anime"
#         data = scrape_search_anime(url)
        
#         if data:
#             results = []
#             results.extend(data)
            
#             return jsonify({'success': "success", 'data': results})
#         else:
#             return jsonify({'success': "fail", 'message': "No data was scraped."}), 404

#     except Exception as e:
#         logging.error(f"An error occurred: {e}")
#         return jsonify({'success': "fail", 'message': "An error occurred.", 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host=os.getenv('FLASK_RUN_HOST'), port=os.gotenv('FLASK_RUN_PORT'))