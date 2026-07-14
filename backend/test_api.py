import urllib.request, json, urllib.error, re
req = urllib.request.Request('https://backend-pi-lovat-57.vercel.app/api/auth/register/', data=json.dumps({'username':'teja', 'email':'Testing@123', 'password':'password123'}).encode('utf-8'), headers={'Content-Type': 'application/json'})
try:
    urllib.request.urlopen(req)
except urllib.error.HTTPError as e:
    html=e.read().decode('utf-8')
    with open('error.html', 'w') as f:
        f.write(html)
    print("Error saved to error.html")
