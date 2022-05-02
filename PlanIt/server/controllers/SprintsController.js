import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService.js";
import BaseController from "../utils/BaseController.js";

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/sprints')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .get('', this.getSprintsForProject)
    .post('', this.createSprint)
    .delete('/:id', this.deleteSprint)
  }
  async getSprintsForProject(req, res, next) {
    try {
      const sprints = await sprintsService.getSprintsForProject(req.params.projectId)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }
  async createSprint(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const sprint = await sprintsService.createSprint(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }
  async deleteSprint(req, res, next) {
    try {
      await sprintsService.deleteSprint(req.params.id, req.userInfo.id)
      res.send()
    } catch (error) {
      next(error)
    }
  }
}