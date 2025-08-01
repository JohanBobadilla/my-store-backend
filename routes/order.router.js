const express = require("express");

const OrderService = require("../services/order.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require("../schemas/order.schema");


const router = express.Router();
const service = new OrderService();

router.get("/", async (req, res) => {
  const orders = await service.find();
  res.json(orders);
});

router.get("/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
});

router.post("/",
  validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
});

router.patch("/:id",
  validatorHandler(getOrderSchema, "params"),
  validatorHandler(updateOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
});

router.delete("/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.deleteOrder(id);
      res.status(204).json({ id });
    } catch (error) {
      next(error);
    }
  });
  router.post("/add-item",
    validatorHandler(addItemSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newItem = await service.addItem(body);
        res.status(201).json(newItem);
      } catch (error) {
        next(error);
      }
    }
  );



module.exports = router;
