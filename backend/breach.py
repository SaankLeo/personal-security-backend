import hashlib
import requests

HIBP_RANGE_URL = "https://api.pwnedpasswords.com/range/{}"

def sha1_hexdigest(password: str) -> str:
    return hashlib.sha1(password.encode('utf-8')).hexdigest().upper()

def pwned_count(password: str) -> int:
    sha1 = sha1_hexdigest(password)
    prefix, suffix = sha1[:5], sha1[5:]
    resp = requests.get(HIBP_RANGE_URL.format(prefix), timeout=10)
    if resp.status_code != 200:
        raise RuntimeError('HIBP API error')
    hashes = (line.split(':') for line in resp.text.splitlines())
    for h, count in hashes:
        if h == suffix:
            return int(count)
    return 0
