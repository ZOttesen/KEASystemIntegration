from fastapi import FastAPI, Form,File,UploadFile
import aiofiles

app = FastAPI()

@app.post("/form")
def (username: str = Form(...), password: str = Form(default=...,min_length=8)):
    print(username, password)
    return {"username": username}

@app.post("/fileform")
def file_form(file: bytes = File(...)):
with open('file', 'wb') as f:
f.write(file)
return {"message": "File Successfully Uploaded"}

@app.post("/fileform")
async def file_form(file: UploadFile = File(...)):
contents = await file.read()
return {"filename": file.filename }
@app.post("/fileform")
async def file_form(file: UploadFile = File(...)):
    safe_filename = file.filename.replace("/","").replace("\","")

    with open(safe_filename, "wb") as f:
while content := await file.read(1024): # read in chunks
f.write(content)
@app.post("/fileform")
async def file_form(file: UploadFile = File(...)):
    safe_filename = file.filename.replace("/","").replace("\","_")
    # aiofiles ensures that its async
    async with aiofiles.open(safe_filename, "wb") as f:
        while content := await file.read(1024): # read in chunks
            await f.write(content)