const { Schema, model } = require('mongoose')
const { randomBytes } = require('crypto')
const bcrypt = require('bcrypt')

const UserSchema = Schema({
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    phoneNumber: {
        type: Schema.Types.Number,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    }

})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
    next();
})

const User = model('users', UserSchema)

module.exports = User;