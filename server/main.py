from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import logging
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS = CORS(app, origins="*")

@app.route('/image/', methods=['GET'])
def index():
    try:
        print("Hello World")
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({'success': "fail", 'message': "An error occurred.", 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host=os.getenv('FLASK_RUN_HOST'), port=os.gotenv('FLASK_RUN_PORT'))