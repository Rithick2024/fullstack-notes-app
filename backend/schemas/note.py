from pydantic import BaseModel
from datetime import datetime

class NoteCreate(BaseModel):
    note_title: str
    note_content: str
    user_id: int

class NoteOut(NoteCreate):
    note_id: int
    created_on: datetime
    last_update: datetime
