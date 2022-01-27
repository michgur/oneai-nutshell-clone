import json
from typing import Optional, Dict
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


def get_skills(params: Dict, uid: UUID):
    # oneai_api = "https://stage-studio.oneai.com/api/v0/pipeline"
    # oneai_api = "https://staging.oneai.com/api/v0/pipeline"
    oneai_api = "https://api.oneai.com/api/v0/pipeline"
    length = len(params["text"]) * (int(params["summary_percent"]) / 100)
    length_range = 40
    data = {
        "text": params["text"],
        "input_type": "article",
        "steps": [
            {"skill": "emotions", "input": "0", "id": "1"},
            {
                "skill": "summarize",
                "input": "1",
                "id": "2",
                "params": {
                    "min_length": max((0, length - length_range)),
                    "max_length": length + length_range,
                },
            },
        ],
    }
    data = {
        "text": params["text"],
        "input_type": "article",
        "steps": [
            {"skill": "emotions", "input": "0", "id": "1"},
            {
                "skill": "summarize",
                "input": "1",
                "id": "2",
                "params": {
                    "min_length": max((0, length - length_range)),
                    "max_length": length + length_range,
                    "find_origins": False,
                },
            },
            # {"skill": "entities", "input": "0", "id": "1"},
            # {"skill": "article-topics", "input": "1", "id": "2"},
        ],
    }
    try:
        headers = {
            "Content-Type": "application/json",
            "Access-Token": "bed4990c-4f71-4482-9fb2-10649585350c",
        }
        r = requests.post(oneai_api, json.dumps(data), headers=headers, timeout=25)
        return r.json()
    except RequestException as e:
        logger.debug(f"[ f{uid} get_skills error ] {str(e)}")
        return None
