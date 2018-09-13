const mongoose = require('mongoose')
const Schema = mongoose.Schema


const quoteSchema = new Schema({
    status: String,
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId}]
})


const Quote = mongoose.model('Quote', quoteSchema)


module.exports = Quote