export class Project {
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.creatorId = data.creatorId
  }
}