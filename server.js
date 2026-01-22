require("dotenv").config();

const express = require("express");
const { connectDB } = require("./database/mongo");
const productsRoutes = require("./routes/products");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

app.use("/api/products", productsRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running`);
    console.log(`👉 http://localhost:${PORT}`);
  });
});
