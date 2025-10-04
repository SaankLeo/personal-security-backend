🛡️ How I Met Your Password

A lightweight Flask + JavaScript web app that lets you check your digital security in one place.
Built for developers, students, and curious minds who want to protect their digital footprint — the smart way.

⚡ Features

✅ Password Breach Check — instantly checks if your password has appeared in any known data breaches (using the Have I Been Pwned API).
✅ Port Scan — scans open ports on your local machine to detect potential vulnerabilities.
✅ Digital Footprint (OSINT) — checks for your username across major platforms like GitHub, GitLab, Stack Overflow, and NPM.

All features run locally — your data never leaves your computer.

🚀 Run Locally

Clone the repo:

git clone https://github.com/SaankLeo/personal-security-backend.git
cd personal-security-backend


Set up the virtual environment:

python -m venv venv
venv\Scripts\activate


Install dependencies:

pip install -r requirements.txt


Run the backend:

python backend/app.py


Your Flask server will start at:
👉 http://127.0.0.1:5000

💻 Frontend Setup

Open the file frontend/index.html directly in your browser.
(You can also use the VS Code “Live Server” extension for auto reload.)

The dashboard will automatically talk to your Flask backend.

No extra setup. No build tools. Just run and use.

🔗 API Endpoints
Endpoint	Method	Description
/	GET	Health check — confirms the backend is running
/breach	POST	Checks password against known breach databases
/osint	GET	Looks up usernames across popular developer platforms
/scan	GET	Scans open ports on localhost

(You can test these routes in your browser or via the frontend dashboard.)

🧠 How It Works

Flask backend handles all logic for password checks, port scanning, and OSINT lookups.

Frontend (HTML + JS) is a simple dashboard that sends fetch() requests to the backend.

Everything runs on your local machine — no cloud dependencies, no data sharing.

This means you can audit, test, and play with cybersecurity concepts completely offline.
