const Joi = require('joi')
const mongoose = require('mongoose')

const userschema = new mongoose.Schema(
    {
        username: {type: String, required:true},
        firstName: {type: String, required:true},
        lastName: {type: String, required:true},
        password: {type: String, required:true},
        createdDate: { type: Date, default: Date.now },
        age: { type: Number, required: true, min: 16, max: 99 }
    }
);

const User = mongoose.model('User', userschema)

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(4).max(30).required(),
        firstName: Joi.string().max(30).required(),
        lastName: Joi.string().max(30).required(),
        password: Joi.string().min(4).max(30).required(),
        age: Joi.number().integer().min(16).max(99).required(),
    });

    return schema.validate(user);
}


module.exports = {User , validateUser};