import requests

SITES = {
    'github': 'https://github.com/{}',
    'gitlab': 'https://gitlab.com/{}',
    'stackoverflow': 'https://stackoverflow.com/users/{}',
    'npm': 'https://www.npmjs.com/~{}',
    'reddit': 'https://www.reddit.com/user/{}',
    'medium': 'https://medium.com/@{}',
}

def check_username(username, timeout=5):
    found = {}
    headers = {'User-Agent': 'PersonalSecurityDashboard/1.0'}
    for k, url in SITES.items():
        try:
            r = requests.get(url.format(username), timeout=timeout, headers=headers, allow_redirects=True)
            if r.status_code == 200:
                found[k] = url.format(username)
        except requests.RequestException:
            pass
    return found
