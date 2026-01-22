const express = require("express");
const router = express.Router();
const { getDB } = require("../database/mongo");

router.get("/", async (req, res) => {

  const db = getDB();
  const collection = db.collection("products");

  const { category, minPrice, sort, fields } = req.query;

  let filter = {};
  let sortOption = {};
  let projection = {};

  if (category) {
    filter.category = category;
  }

  if (minPrice) {
    filter.price = { $gte: Number(minPrice) };
  }

  if (sort === "price") {
    sortOption.price = 1;
  }

  if (fields) {
    const fieldsArray = fields.split(",");

    fieldsArray.forEach(field => {
      projection[field] = 1;
    });
  }

  try {

    const products = await collection
      .find(filter)
      .project(projection)
      .sort(sortOption)
      .toArray();

    res.json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});
router.post("/", async (req, res) => {

  const db = getDB();
  const collection = db.collection("products");

  const { name, price, category } = req.body;

  try {

    const result = await collection.insertOne({
      name,
      price,
      category
    });

    res.status(201).json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});


module.exports = router;
