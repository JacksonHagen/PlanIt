import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, NotFound } from "../utils/Errors.js"

class ProjectsService {
  async deleteProject(projectId, userId) {
    const targetProject = await this.getById(projectId)
    if(targetProject.creatorId.toString() !== userId) {
      throw new BadRequest('You cannot delete projects that do not belong to you.')
    }
    await targetProject.remove()
  }
  async getById(id) {
    const project = await dbContext.Projects.findById(id).populate('creator', 'picture name')
    if(!project) {
      throw new BadRequest('Project not found')
    }
    return project
  }
  async createProject(body) {
    const project = await dbContext.Projects.create(body)
    await project.populate('creator', 'picture name')
    return project
  }
  async getUsersProjects(userId) {
    const res = await dbContext.Projects.find({}).populate('creator', 'picture name')
    return res.filter(p => p.creatorId.toString() === userId.toString())

  }

}
export const projectsService = new ProjectsService()