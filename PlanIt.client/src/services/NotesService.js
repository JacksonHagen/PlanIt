import { AppState } from  "../AppState";
import { api } from "./AxiosService";

class NotesService {
 async createNote(newNote) {
  const res = await api.post('api/projects/' + newNote.projectId + '/notes', newNote)
  AppState.notes = [...AppState.notes, res.data]
 }
 async removeNote(note) {
  await api.delete('api/projects/' + note.projectId + '/notes/' + note.id)
  const index = AppState.notes.findIndex(n => n.id == note.id)
  AppState.notes.splice(index, 1)
 }
}


export const notesService = new NotesService()