import socket
from concurrent.futures import ThreadPoolExecutor

COMMON_PORTS = [21,22,23,25,53,80,110,139,143,443,445,3389,8080]

def scan_port(host, port, timeout=0.8):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    try:
        sock.connect((host, port))
        sock.close()
        return port, True
    except Exception:
        return port, False

def scan(host='127.0.0.1', ports=None, workers=50):
    ports = ports or COMMON_PORTS
    results = {}
    with ThreadPoolExecutor(max_workers=workers) as ex:
        futures = [ex.submit(scan_port, host, p) for p in ports]
        for f in futures:
            port, is_open = f.result()
            results[port] = is_open
    return results
