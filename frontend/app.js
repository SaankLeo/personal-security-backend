const api = url => (path, opts) => fetch(url + path, Object.assign({headers: {'Content-Type':'application/json'}}, opts));
const call = api('http://127.0.0.1:5000');

// Landing page transition
const landing = document.getElementById('landing');
const startBtn = document.getElementById('start-btn');
const layout = document.querySelector('.layout');

startBtn.addEventListener('click', () => {
  landing.classList.add('hidden');
  setTimeout(() => {
    landing.remove();
    layout.classList.remove('hidden');
  }, 600); // match fade duration
});


// ----- PASSWORD SECTION -----
const pwdInput = document.getElementById('pwd-input');
const pwdToggle = document.getElementById('pwd-toggle');
const eyeIcon = document.getElementById('eye-icon');
const pwdCheckBtn = document.getElementById('pwd-check');
const pwdGenBtn = document.getElementById('pwd-gen');
const pwdResult = document.getElementById('pwd-result');

pwdToggle.addEventListener('click', () => {
  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    eyeIcon.innerHTML = '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.48 20.48 0 0 1 4.73-5.94M1 1l22 22" stroke="#f87171" />';
    pwdToggle.title = 'Hide password';
  } else {
    pwdInput.type = 'password';
    eyeIcon.innerHTML = '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" /><circle cx="12" cy="12" r="3" />';
    pwdToggle.title = 'Show password';
  }
});

function generatePassword(length = 16) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.<>?";
  let out = '';
  const cryptoObj = window.crypto || window.msCrypto;
  const randomValues = new Uint32Array(length);
  cryptoObj.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) out += chars[randomValues[i] % chars.length];
  return out;
}

pwdGenBtn.addEventListener('click', () => {
  pwdInput.value = generatePassword(16);
  pwdInput.type = 'text';
  pwdToggle.title = 'Hide password';
});

pwdCheckBtn.addEventListener('click', async () => {
  const p = pwdInput.value;
  if (!p) return alert('Enter a password first.');
  pwdResult.innerText = 'Checking...';
  try {
    const res = await call('/api/password/check', {method: 'POST', body: JSON.stringify({password: p})});
    const j = await res.json();
    if (j.error) return pwdResult.innerText = `Error: ${j.error}`;
    pwdResult.innerText = (j.pwned_count ?? 0) === 0
      ? '✅ This password was NOT found in known breaches.'
      : `⚠️ Found ${j.pwned_count.toLocaleString()} times in data breaches.`;
  } catch (err) {
    pwdResult.innerText = `Request failed: ${err.message}`;
  }
});

// ----- PORT SCAN -----
const scanBtn = document.getElementById('scan-btn');
const scanOut = document.getElementById('scan-result');
const hostInput = document.getElementById('host-input');

scanBtn.addEventListener('click', async () => {
  let host = hostInput.value.trim() || '127.0.0.1';
  scanOut.innerText = `Scanning ${host}...`;
  try {
    const res = await call('/api/scan/ports', {method: 'POST', body: JSON.stringify({host})});
    const j = await res.json();
    if (j.error) { scanOut.innerText = j.error; return; }
    const rows = Object.entries(j.results)
      .sort(([a], [b]) => a - b)
      .map(([p, open]) => `${p.padStart(5)} → ${open ? 'OPEN' : 'closed'}`);
    scanOut.innerText = rows.join('\\n');
  } catch (err) {
    scanOut.innerText = `Scan failed: ${err.message}`;
  }
});

// ----- OSINT -----
const osintBtn = document.getElementById('osint-btn');
const osintUser = document.getElementById('osint-user');
const osintOut = document.getElementById('osint-result');

osintBtn.addEventListener('click', async () => {
  const u = osintUser.value.trim();
  if (!u) return alert('Enter a username');
  osintOut.innerText = 'Searching...';
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/osint/${encodeURIComponent(u)}`);
    const j = await res.json();
    if (j.error) return osintOut.innerText = `Error: ${j.error}`;
    const sites = j.found || {};
    if (Object.keys(sites).length === 0) {
      osintOut.innerText = 'No matches found on supported sites.';
    } else {
      let text = '';
      for (const [site, url] of Object.entries(sites)) {
        text += `• ${site.toUpperCase()} → ${url}\\n`;
      }
      osintOut.innerText = text.trim();
    }
  } catch (err) {
    osintOut.innerText = `Request failed: ${err.message}`;
  }
});

// Tab navigation (switch sections)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabs = document.querySelectorAll('.tab');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});
