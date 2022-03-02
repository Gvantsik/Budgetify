const express = require("express");
const req = require("express/lib/request");
const database = require("../database/database");
const transactionsRouter = express.Router();

transactionsRouter.get("/:id", (req, res) => {
  res.status(200).json({ status: "success" });
});

transactionsRouter.post("/", (req, res) => {
  res.status(200).json({ status: "success" });
});

transactionsRouter.patch("/:id", (req, res) => {
  res.status(200).json({ status: "success" });
});
transactionsRouter.delete("/:id", (req, res) => {
  res.status(200).json({ status: "success" });
});
module.exports = transactionsRouter;
