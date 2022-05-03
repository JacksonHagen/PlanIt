import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TasksService {
  async getTasks(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId }).populate('creator')
    return tasks
  }
  async createTask(body) {
    const task =  await dbContext.Tasks.create(body)
    await task.populate('creator')
    return task
  }
  async editTask(newTask, userId) {
    const task = await dbContext.Tasks.findById(newTask.id)
    if(!task) {
      throw new BadRequest('Could not find task')
    }
    if(task.creatorId.toString() !== userId.toString()) {
      throw new BadRequest('You cannot edit tasks you did not create')
    }
    task.name = newTask.name || task.name
    task.weight = newTask.weight || task.weight
    task.isCompleted = newTask.isCompleted || task.isCompleted
    task.sprintId = newTask.sprintId || task.sprintId
    await task.save()
    return task
  }
  async deleteTask(taskId, userId) {
    const targetTask = await dbContext.Tasks.findById(taskId)
    if(!targetTask) {
      throw new BadRequest('Could not find task')
    }
    if(targetTask.creatorId.toString() !== userId.toString()) {
      throw new BadRequest('You cannot edit tasks you did not create')
    }
    await targetTask.remove()
  }

}
export const tasksService = new TasksService