import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class NotesService {
  async deleteNote(noteId, userId) {
    const targetNote = await dbContext.Notes.findById(noteId)
    if(!targetNote) {
      throw new BadRequest('Couldnt find note')
    }
    if(targetNote.creatorId.toString() !== userId.toString()) {
      throw new BadRequest('You cannot delete notes that are not yours')
    }
    await targetNote.remove()
  }
  async createNote(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator')
    return note
  }
  async getNotes(projectId) {
    return await dbContext.Notes.find({ projectId: projectId}).populate('creator')
  }


}
export const notesService = new NotesService()