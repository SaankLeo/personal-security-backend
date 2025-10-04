from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from breach import pwned_count
from scanner import scan
from osint import check_username

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Password breach endpoint
@app.route('/api/password/check', methods=['POST'])
def password_check():
    data = request.json or {}
    pwd = data.get('password', '')
    if not pwd:
        return jsonify({'error': 'no password provided'}), 400
    try:
        count = pwned_count(pwd)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return jsonify({'pwned_count': count})

# Port scan endpoint (only localhost allowed for safety)
@app.route('/api/scan/ports', methods=['POST'])
def port_scan():
    data = request.json or {}
    host = data.get('host', '127.0.0.1')
    if host not in ['127.0.0.1', 'localhost']:
        return jsonify({'error': 'For demo, only localhost is allowed.'}), 403
    ports = data.get('ports')
    result = scan(host, ports)
    return jsonify({'host': host, 'results': result})

# OSINT endpoint
@app.route('/api/osint/<username>', methods=['GET'])
def api_osint(username):
    if not username:
        return jsonify({'error': 'username required'}), 400
    found = check_username(username)
    return jsonify({'username': username, 'found': found})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True)
