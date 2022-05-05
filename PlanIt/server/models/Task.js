import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema({
  name: {type: String, required: true},
  weight: {type: Number, required: true},
  projectId: {type: Schema.Types.ObjectId, required: true, ref: 'Project'},
  sprintId: {type: Schema.Types.ObjectId, required: true, ref: 'Sprint'},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
  //NOTE isComplete DIFFERS FROM THE NAMING CONVENTION  OF THE README
  isComplete: {type: Boolean, default: false}
},
{ timestamps: true, toJSON: { virtuals: true } })

TaskSchema.virtual('project',{
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})
TaskSchema.virtual('sprint',{
  localField: 'sprintId',
  foreignField: '_id',
  ref: 'Sprint',
  justOne: true
})
TaskSchema.virtual('creator',{
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})