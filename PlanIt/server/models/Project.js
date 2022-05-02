import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
})

ProjectSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})