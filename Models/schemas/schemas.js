const Joi = require('joi');

const Schemas = {
    Book: Joi.object({
        Title: Joi.string().min(3).max(255).required(),
        Author: Joi.string().required(),
        Comments: Joi.string().pattern(new RegExp('^[א-תA-Za-z0-9]{3,255}$')),
    })
}

module.exports = Schemas;
