import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TasksService {
  async getTasks(id) {
    const tasks = await dbContext.Tasks.find({ projectId: id }).populate('creator')
    return tasks
  }
  async createTask(body) {
    const task =  await dbContext.Tasks.create(body)
    await task.populate('creator')
    return task
  }
  async editTask(newTask) {
    const task = await dbContext.Tasks.findById(newTask.params.id)
    if(!task) {
      throw new BadRequest('Could not find task')
    }
    if(task.creatorId.toString() !== newTask.userInfo.id.toString()) {
      throw new BadRequest('You cannot edit tasks you did not create')
    }
    // task.body.sprintId = newTask.body.sprintId || task.body.sprintId
    task.body.name = newTask.body.name || task.body.name
    task.body.weight = newTask.body.weight || task.body.weight
    task.body.isComplete = newTask.body.isComplete || task.body.isComplete
    task.body.sprintId = newTask.body.sprintId || task.body.sprintId
    await task.save()
    return task
  }
  async deleteTask(taskId, userId) {

  }

}
export const tasksService = new TasksService