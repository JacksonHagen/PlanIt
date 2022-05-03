import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class SprintsService {
  async getSprintsForProject(projectId) {
    return await dbContext.Sprints.find({projectId}).populate('creator', 'name')
  }
  async createSprint(body) {
    const sprint = await dbContext.Sprints.create(body)
    await sprint.populate('creator', 'name picture')
    return sprint
  }
  async deleteSprint(projectId, userId) {
    const targetSprint = await dbContext.Sprints.findById(projectId)
    if(!targetSprint) {
      throw new BadRequest('Sprint not found')
    }
    if(targetSprint.creatorId.toString() !== userId) {
      throw new BadRequest('You cannot delete sprints that you did not create')
    }
    await targetSprint.remove()
  }

}

export const sprintsService = new SprintsService()