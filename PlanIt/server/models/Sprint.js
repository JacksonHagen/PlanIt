import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SprintSchema = new Schema({
  name: {type: String, required: true},
  projectId: {type: Schema.Types.ObjectId, required: true, ref: 'Project'},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'}
})
SprintSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})