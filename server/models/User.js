const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require("email-validator");

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6
    },
    quotes: [{ type: Schema.Types.ObjectId, ref: 'Quote' }]
})

userSchema.pre('save', function(next){
    const err = new Error(`Must Be Email`)
    if(validator.validate(this.email)){
        next()
    }else{
        next(err)
    }
    
})

const User = mongoose.model('User', userSchema)


module.exports = User