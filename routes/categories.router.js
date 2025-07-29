const express = require("express");

const CategoryService = require("../services/category.service");
const { createCategorySchema, getCategorySchema, updateCategorySchema } = require("../schemas/category.schema");
const validatorHandler = require("../middlewares/validator.handler");

const router = express.Router();
const service = new CategoryService();

// router.get('/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId,
//   });
// });

router.get("/", async (req, res) => {
  const category = await service.find();
  res.json(category);
});

router.get("/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const categorie = await service.findOne(id);
    res.json(categorie);
  } catch (error) {
    next(error);
  }
});

router.post("/",
  validatorHandler(createCategorySchema, "body"),
  async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
});

router.patch("/:id",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const categorie = await service.update(id, body);
    res.json(categorie);
  } catch (error) {
    next(error);
  }
})

router.delete("/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
