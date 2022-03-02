const express = require("express");
const req = require("express/lib/request");
const database = require("../database/database");
const categoriesRouter = express.Router();

categoriesRouter.get("/", (req, res) => {
  res.status(200).json({ status: "success" });
});
categoriesRouter.get("/:id", (req, res) => {
  res.status(200).json({ status: "success" });
});

categoriesRouter.post("/", (req, res) => {
  res.status(200).json({ status: "success" });
});

categoriesRouter.patch("/:id", (req, res) => {
  res.status(200).json({ status: "success" });
});
categoriesRouter.delete("/:id", (req, res) => {
  res.status(200).json({ status: "success" });
});
module.exports = categoriesRouter;
