from fastapi import FastAPI, Request
import json

app = FastAPI()

@app.post("/webhook")
async def github_webhook(request: Request):
    data = await request.body()
    print(json.loads(data))
    return

@app.post("/github_webhook")
async def github_webhook(request: Request):
    if request.headers.get('content-type') == "applion/x-www-form-urlencoded":
        form_data = await request.form()
        print(form_data)
    return