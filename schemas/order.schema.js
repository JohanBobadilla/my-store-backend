const Joi = require("joi");

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const quantity = Joi.number().integer().min(1);
const total = Joi.number().precision(2).min(0);
const status = Joi.string().valid('pending', 'completed', 'cancelled');

const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  productId: productId.optional(),
  quantity: quantity.optional(),
  total: total.optional(),
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
  productId: productId,
  quantity: quantity,
  total: total,
  status: status,
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema };
