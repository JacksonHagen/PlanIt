import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema({
  body: {type: String, required: true},
  taskId: {type: Schema.Types.ObjectId, required: true, ref: 'Task'},
  projectId: {type: Schema.Types.ObjectId, required: true, ref: 'Project'},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'}
},
{ timestamps: true, toJSON: { virtuals: true } })
NoteSchema.virtual('project',{
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})