import { Auth0Provider } from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService.js";
import BaseController from "../utils/BaseController.js";

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .get('', this.getTasks)
    .post('', this.createTask)
    .put('/:id', this.editTask)
    .delete('/:id', this.deleteTask)
  }
  async getTasks(req, res, next) {
    try {
      const tasks = await tasksService.getTasks(req.params.projectId)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }
  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const task = await tasksService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }
  async editTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.editTask(req)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }
  async deleteTask(req, res, next) {
    try {
      await tasksService.deleteTask(req.params.id, req.userInfo.id)
      res.send()
    } catch (error) {
      next(error)
    }
  }
} 