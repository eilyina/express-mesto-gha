const { Joi } = require('celebrate');
const { urlRegExp } = require('./constants');

const cardCreateSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
  }),
};

const idSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
};

const userUpdateSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
  }),
};

const avatarUpdateSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp),
  }),
};

const userRegistrationSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

const userLoginSchema = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  cardCreateSchema,
  idSchema,
  userUpdateSchema,
  avatarUpdateSchema,
  userRegistrationSchema,
  userLoginSchema,
};
