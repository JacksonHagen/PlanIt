import { AppState } from "../AppState.js"
import { Project } from "../Models/Project.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProjectsService {
  async getAllProjects() {
    const res = await api.get('api/projects')
    AppState.projects = res.data.map(p => new Project(p))
  }

  async setActiveProject(id) {
  const res = await api.get('api/projects/' + id)
  AppState.activeProject = new Project(res.data)
}
  async createProject(data){
    const res = await api.post('api/projects', data)
    AppState.projects.unshift(new Project(res.data))
    return new Project(res.data)
  }
  async deleteProject(id) {
    
    const index = AppState.projects.findIndex(p => p.id == id)
    await api.delete('api/projects/' + id)
    AppState.projects.splice(index, 1)
  }
}


export const projectsService = new ProjectsService()