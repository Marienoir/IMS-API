import Joi from 'joi';

export const createUserSchema = {
  schema: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    image_url: Joi.string().required(),
    phone_number: Joi.number().required(),
    gender: Joi.string().required(),
    password: Joi.string().lowercase().required(),
    role: Joi.string().required(),
  }),
  message: 'Error creating user',
};

export const loginUserSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().lowercase(),
  }),
};

export const createPurchaseSchema = {
  schema: Joi.object().keys({
    item: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    delivery_time: Joi.string().required(),
  }),
  message: 'Error creating product',
};

export const createStockchema = {
  schema: Joi.object().keys({
    item: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    last_stocked: Joi.string(),
  }),
  message: 'Error creating Stock',
};

export const createSaleschema = {
  schema: Joi.object().keys({
    item: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    customer_name: Joi.string(),
    customer_email: Joi.string().email(),
  }),
  message: 'Error creating Sales',
};

export const refreshTokenSchema = {
  schema: Joi.object().keys({
    refresh_token: Joi.string().required(),
  }),
  message: 'Error creating refresh token',
};
