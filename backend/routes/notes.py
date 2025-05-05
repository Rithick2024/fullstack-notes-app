from fastapi import APIRouter, HTTPException, Query
from typing import List
from schemas.note import NoteCreate, NoteOut
from models.note import create_note, get_notes, get_note, update_note, delete_note

router = APIRouter()

@router.post("/notes", response_model=NoteOut)
async def notes_create(note: NoteCreate):
    return await create_note(note)

@router.get("/notes", response_model=List[NoteOut])
async def notes_list(user_id: int = Query(...)):
    return await get_notes(user_id=user_id)

@router.get("/notes/{note_id}", response_model=NoteOut)
async def notes_read(note_id: int):
    n = await get_note(note_id)
    if not n:
        raise HTTPException(status_code=404, detail="Note not found")
    return n

@router.put("/notes/{note_id}")
async def notes_update(note_id: int, note: NoteCreate):
    if not await update_note(note_id, note):
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note updated"}

@router.delete("/notes/{note_id}")
async def notes_delete(note_id: int):
    if not await delete_note(note_id):
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted"}