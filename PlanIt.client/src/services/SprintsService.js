import { AppState }from "../AppState";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService";

class SprintsService {
 async getAllActiveSprints(id) {
  const res = await api.get('api/projects/' + id + '/sprints')
  AppState.activeSprints = res.data
 }

 async createSprint(newSprint) {
  const res = await api.post('api/projects/' + AppState.activeProject.id + '/sprints', newSprint)
  AppState.activeSprints.push(res.data)
  console.log(res.data);
  console.log(AppState.activeSprints);
 }

} 

export const sprintsService = new SprintsService()