import { dbContext } from "../db/DbContext.js"

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
  async editTask(taskId, userId, body) {

  }
  async deleteTask(taskId, userId) {

  }

}
export const tasksService = new TasksService