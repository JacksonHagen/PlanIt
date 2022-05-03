import { AppState } from "../AppState.js"
import { Project } from "../Models/Project.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProjectsService {
  async getAllProjects() {
    const res = await api.get('api/projects')
    logger.log(res.data)
    AppState.projects = res.data.map(p => new Project(p))
  }
  async createProject(data){
    const res = await api.post('api/projects', data)
    logger.log(res.data)
    AppState.projects.unshift(new Project(res.data))
  }
}


export const projectsService = new ProjectsService()