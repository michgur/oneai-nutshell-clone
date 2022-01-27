import random
from uuid import uuid4

from fastapi import FastAPI
from loguru import logger

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
    uid = uuid4()
    logger.debug(f"[ f{uid} extract-output url ] {url}")
    text = extract_from_url(url, uid)
    logger.debug(f"[ f{uid} extract-output text ] {text}")
    return text


@app.get("/extract-output/")
async def extract_text(url: str, summary_percent: str):
    uid = uuid4()
    logger.debug(
        f"[ f{uid} extract-output ] url: {url} summary_percent: {summary_percent}"
    )
    text = extract_from_url(url, uid)
    if text is None:
        return None
    logger.debug(f"[ f{uid} extract-output ] text: {text}")
    output = get_skills({"text": text, "summary_percent": summary_percent}, uid)
    logger.debug(f"[ f{uid} extract-output ] output: {output}")
    return output
