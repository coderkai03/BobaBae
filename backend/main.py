from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow requests from localhost:5173

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

@app.route('/api/places', methods=['GET'])
def get_places():
    keyword = request.args.get('keyword')
    location = request.args.get('location')
    radius = request.args.get('radius')
    rankPreference = request.args.get('rankPreference')
    type_place = request.args.get('type')

    url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword={keyword}&location={location}&radius={radius}&type={type_place}&rankPreference={rankPreference}&key={GOOGLE_API_KEY}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/name', methods=['GET'])
def get_name():
    place_id = request.args.get('place_id')
    url = f'https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,formatted_address,geometry&key={GOOGLE_API_KEY}'
    
    print(url)
    try:
        response = requests.get(url)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)