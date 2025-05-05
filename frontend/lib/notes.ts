export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Simple in-memory storage for demo purposes
// In a real app, this would be replaced with API calls to a backend
class NoteService {
  private storage: Storage | null = null;
  private key = 'Notes-App-notes';

  constructor() {
    if (typeof window !== 'undefined') {
      this.storage = window.localStorage;
    }
  }

  private getNotesFromStorage(): Note[] {
    if (!this.storage) return [];
    
    const notes = this.storage.getItem(this.key);
    return notes ? JSON.parse(notes) : [];
  }

  private saveNotesToStorage(notes: Note[]): void {
    if (!this.storage) return;
    
    this.storage.setItem(this.key, JSON.stringify(notes));
  }

  public getAllNotes(): Note[] {
    return this.getNotesFromStorage();
  }

  public getNoteById(id: string): Note | undefined {
    const notes = this.getNotesFromStorage();
    return notes.find(note => note.id === id);
  }

  public createNote(title: string, content: string): Note {
    const notes = this.getNotesFromStorage();
    
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.saveNotesToStorage([newNote, ...notes]);
    return newNote;
  }

  public updateNote(id: string, data: Partial<Note>): Note | undefined {
    const notes = this.getNotesFromStorage();
    const noteIndex = notes.findIndex(note => note.id === id);
    
    if (noteIndex === -1) return undefined;
    
    const updatedNote = {
      ...notes[noteIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    notes[noteIndex] = updatedNote;
    this.saveNotesToStorage(notes);
    
    return updatedNote;
  }

  public deleteNote(id: string): boolean {
    const notes = this.getNotesFromStorage();
    const filteredNotes = notes.filter(note => note.id !== id);
    
    if (filteredNotes.length === notes.length) return false;
    
    this.saveNotesToStorage(filteredNotes);
    return true;
  }
}

export const noteService = new NoteService();