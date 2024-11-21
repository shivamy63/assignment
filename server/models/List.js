import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  responseCodes: [{ code: String, imageUrl: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const List = mongoose.model('List', listSchema);
