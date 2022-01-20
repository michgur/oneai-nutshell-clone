import json
from typing import Optional
from uuid import UUID

import requests
from requests import RequestException
from loguru import logger


def get_page(url: str, uid: UUID) -> Optional[str]:
    try:
        r = requests.get(url)
        return r.text
    except RequestException as e:
        logger.debug(f"[ f{uid} get_page error ] {str(e)}")
        return None


def get_skills(text: str, uid: UUID):
    # oneai_api = "https://stage-studio.oneai.com/api/v0/pipeline"
    oneai_api = "https://staging.oneai.com/api/v0/pipeline"
    data = {
        "text": text,
        "input_type": "article",
        "steps": [
            {
                "skill": "summarize",
                "input": "0",
                "id": "1",
                "params": {"min_length": 5, "max_length": 100, "find_origins": False},
            }
            # {"skill": "entities", "input": "0", "id": "1"},
            # {"skill": "article-topics", "input": "1", "id": "2"},
        ],
    }
    try:
        headers = {"Content-Type": "application/json"}
        r = requests.post(oneai_api, json.dumps(data), headers=headers, timeout=25)
        return r.json()
    except RequestException as e:
        logger.debug(f"[ f{uid} get_skills error ] {str(e)}")
        return None
