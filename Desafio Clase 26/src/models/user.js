const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    email: String,
    password: String,
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async (password) => {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('users', userSchema)