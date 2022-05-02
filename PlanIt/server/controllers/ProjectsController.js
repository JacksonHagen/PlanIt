import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectsService } from "../services/ProjectsService.js";
import BaseController from "../utils/BaseController.js";

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUsersProjects)
      .get('/:id', this.getProjectById)
      .post('', this.createProject)
      .delete('/:id', this.deleteProject)
  }

  async getUsersProjects(req, res, next) {
    try {
      const projects = await projectsService.getUsersProjects(req.userInfo.id)
      res.send(projects)
    }
    catch(error) {
      next(error)
    }
  }
  async getProjectById(req, res, next) {
    try {
      const project = await projectsService.getById(req.params.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
  async createProject(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.createProject(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
  async deleteProject(req, res, next) {
    try {
      await projectsService.deleteProject(req.params.id, req.userInfo.id)
      res.send()
    } catch (error) {
      next(error)
    }
  }
}