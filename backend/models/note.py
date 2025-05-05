from datetime import datetime
from typing import List
from schemas.note import NoteCreate, NoteOut
from db import db

async def create_note(data: NoteCreate):
    last = await db.notes.find_one(sort=[("note_id", -1)])
    next_id = (last["note_id"] + 1) if last else 1
    note = {
        "note_id": next_id,
        "note_title": data.note_title,
        "note_content": data.note_content,
        "user_id": data.user_id,  # ✅ Include user_id
        "created_on": datetime.utcnow(),
        "last_update": datetime.utcnow()
    }
    await db.notes.insert_one(note)
    return note

async def get_notes(user_id: str) -> List[NoteOut]:
    notes = await db.notes.find({"user_id": user_id}).to_list(length=100)
    return [NoteOut(**note) for note in notes]

async def get_note(note_id: int):
    return await db.notes.find_one({"note_id": note_id})

async def update_note(note_id: int, data: NoteCreate):
    result = await db.notes.update_one(
        {"note_id": note_id},
        {
            "$set": {
                "note_title": data.note_title,
                "note_content": data.note_content,
                "last_update": datetime.utcnow()
            }
        }
    )
    return result.modified_count > 0

async def delete_note(note_id: int):
    result = await db.notes.delete_one({"note_id": note_id})
    return result.deleted_count > 0
