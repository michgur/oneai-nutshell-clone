from fastapi import FastAPI

from nutshell.comm import get_skills
from nutshell.extract_text import extract_from_url

app = FastAPI()


@app.get("/")
async def root():
    # http://localhost:8000/extract-output/?url=https%3A%2F%2Fdonaldgmcneiljr1954.medium.com%2Ftrump-backs-boosters-clearly-someone-did-the-math-for-him-153a2ff62718
    return {
        "message": "Nutshell backend, use https://<APP_URL>/extract-output/?url=<encodeURIComponent(URL)>"
    }


@app.get("/extract-text/")
async def extract_text(url: str):
    text = extract_from_url(url)
    return text


@app.get("/extract-output/")
async def extract_text(url: str):
    text = extract_from_url(url)
    output = get_skills(text)
    return output
