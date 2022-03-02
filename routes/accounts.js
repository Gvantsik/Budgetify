const express = require("express");
const req = require("express/lib/request");
const database = require("../database/database");
const accountsRouter = express.Router();

accountsRouter.get("/:id", (req, res) => {
  for (let account of database.accounts) {
    if (account.id === Number(req.params.id)) {
      res.status(200).json({
        status: "success",
        account,
      });
      return;
    }
  }

  res.status(404).json({
    status: "error",
    message: "Account with given id doesn't exist",
  });
});

accountsRouter.post("/", (req, res) => {
  for (let account of database.accounts) {
    if (account.name === req.body.name) {
      res.status(404).json({
        status: "error",
        message: "Account with given name already exists",
      });
    }
  }
  const newAccount = {
    id: database.accounts.length + 1,
    ...req.body,
  };

  database.accounts.push(newAccount);

  res.status(200).json({
    status: "success",
    data: newAccount,
  });
});

accountsRouter.patch("/:id", (req, res) => {
  let index = 0;
  for (let account of database.accounts) {
    if (account.id === Number(req.params.id)) {
      account = {
        ...account,
        ...req.body,
      };
      database.accounts[index] = account;

      res.status(202).json({
        status: "success",
        data: {
          message: "requested account changed successfully",
        },
      });
      return;
    }
    index++;
  }

  res.status(404).json({
    status: "error",
    data: {
      message: "requested item was not found",
    },
  });
});
accountsRouter.delete("/:id", (req, res) => {
  for (let i = 0; i < database.accounts.length; i++) {
    if (database.accounts[i].id === Number(req.params.id)) {
      database.accounts.splice(i, 1);
      res.status(200).json({
        status: "success",
        data: {
          message: "deleted successfully",
        },
      });
      return;
    }
  }
  res.status(404).json({
    status: "error",
    data: {
      message: "Could not delete account with this id",
    },
  });
});
module.exports = accountsRouter;
