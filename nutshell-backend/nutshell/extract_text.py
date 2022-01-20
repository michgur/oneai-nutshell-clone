from typing import Optional
from uuid import UUID

import trafilatura
from requests import RequestException

from nutshell.comm import get_page
from nutshell.data_types import HTML


def extract_from_url(url: str, uid: UUID) -> Optional[str]:
    body = get_page(url, uid)
    if not body:
        return None
    return extract(body)


def extract(body: HTML):
    return trafilatura.extract(
        body,
        include_comments=False,
        include_tables=False,
    )
