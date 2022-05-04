import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TasksService {
  async createTask(newTask) {
    const res = await api.post('api/projects/' + newTask.projectId + '/tasks', newTask)
    logger.log(res)
    AppState.tasks.push(res.data)
  }
  async getTasks() {
    const res = await api.get('api/projects/' + AppState.activeProject.id + '/tasks')
    logger.log(res.data)
    AppState.tasks = res.data.filter
  }
}

export const tasksService = new TasksService()