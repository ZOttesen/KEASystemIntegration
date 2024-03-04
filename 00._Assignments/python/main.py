from flask import Flask, request, Response
from markupsafe import escape
import time
import json

app = Flask(__name__)

def generate_random_data():
    while True:
        data = json.dumps({'time': time.strftime('%Y-%m-%d %H:%M:%S'), 'value': time.time()})
        yield f"data: {data}\n\n"
        time.sleep(1)

@app.route('/')
def sse_request():
    return Response(generate_random_data(), content_type='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
