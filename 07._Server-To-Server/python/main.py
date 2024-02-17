from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/fastapiData")
def _():
    return {"message": [1,2,3,4,5,]}


@app.get("/getExpressData")
def _():
    response = requests.get('http://localhost:8080/expressData')
    return response.json()
