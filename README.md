# Personal Security Dashboard

## Features
- Password breach check (via Have I Been Pwned API)
- Port scan (restricted to localhost)
- Digital footprint (OSINT username check on GitHub, GitLab, StackOverflow, NPM)

## Run instructions
```bash
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install --upgrade pip
pip install flask requests flask-cors
python backend/app.py
```
Open http://127.0.0.1:5000 in browser.
