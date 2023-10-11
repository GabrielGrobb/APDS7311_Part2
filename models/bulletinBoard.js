const mongoose = require('mongoose')
const Joi = require('joi')

const bulletinBoardschema = new mongoose.Schema(
    {
        title: {type: String, required:true},
        description: {type: String, required: true},
        department: {type: String, required: true}
    }
)

const BulletinBoard = mongoose.model('BulletinBoard', bulletinBoardschema)

function validatePost(bulletinBoard){
    const schema = Joi.object({
        title: Joi.string().min(4).max(30).required(),
        description: Joi.string().min(4).max(150).required(),
        department: Joi.string().min(4).max(20).required(),
    });

    return schema.validate(bulletinBoard);
}

module.exports = {BulletinBoard , validatePost};