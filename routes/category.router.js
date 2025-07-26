const express = require("express");
const { faker } = require("@faker-js/faker");

const CategoryService = require("../services/category.service");


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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await service.findOne(id);
    res.json(categorie);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const categorie = await service.update(id, body);
    res.json(categorie);
  } catch (error) {
    next(error);
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
})



module.exports = router;
