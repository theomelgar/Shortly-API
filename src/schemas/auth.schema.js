import Joi from "joi"

export const signUpSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required()
})