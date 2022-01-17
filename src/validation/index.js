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
    approval_status: Joi.string().required(),
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
