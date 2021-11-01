const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : { type: String, required: true, trim: true},
    //age : { type: Number, minimum: 0, maximum:100, exclusiveMaximum: true},
    age : { type: Number, required: true, trim: true},
    email: { type: String, required: true, trim: true},
    todos : [user]
    //todos : { type: Array, prefixItems: [{type: Number}, {type: String }]}
})
const User = mongoose.model('User', userSchema)
module.exports = User;