import mongoose from 'mongoose'

let VoteSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    count: { type: Number, default: 0 }
})

export default mongoose.model('votes', VoteSchema)
