import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TasksService {
  async createTask(newTask) {
    const res = await api.post('api/projects/' + newTask.projectId + '/tasks', newTask)
    AppState.tasks = [...AppState.tasks, res.data]
  }
  async getTasks(projectId) {
    const res = await api.get('api/projects/' + projectId + '/tasks')
    AppState.tasks = res.data
  }
  async removeTask(taskId, projectId){
    await api.delete('api/projects/'+ projectId + '/tasks/' + taskId)
    const index = AppState.tasks.findIndex(t => t.id == taskId)
    AppState.tasks.splice(index, 1)
    
  }
  async moveTask(task, sprint){
    task.sprintId = sprint.sprintId
    await api.put('api/projects/'+ sprint.projectId + '/tasks/'+ task.id, task)
    this.getTasks(sprint.projectId)
  }
  async toggleCompleted(task) {
    const res = await api.put('api/projects/' + task.projectId + '/tasks/' + task.id, task)
    this.getTasks(task.projectId)
  }
}

export const tasksService = new TasksService()