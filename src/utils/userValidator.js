const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string(),
    instagram: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    pix: Joi.string().required(),
    password: Joi.string().required(),
    active: Joi.boolean().required(),
});

module.exports = (data) => {
    const { error, value } = userSchema.validate(data);
    if (error) {
        throw new Error(error)
    }
    return value;
}