import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService.js";
import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .get('', this.getNotes)
    .post('', this.createNote)
    .delete('/:id', this.deleteNote)
  }
  async getNotes(req, res, next) {
    try {
      const notes = await notesService.getNotes(req.params.projectId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }
  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
  async deleteNote(req, res, next) {
    try {
      await notesService.deleteNote(req.params.id, req.userInfo.id)
      res.send()
    } catch (error) {
      next(error)
    }
  }
}