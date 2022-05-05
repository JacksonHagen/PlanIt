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
 async getAllNotes(projectId) {
   const res = await api.get('api/projects/' + projectId + '/notes')
   AppState.notes = res.data
 }
}


export const notesService = new NotesService()