const express = require('express');
const database = require('../database/database');
const userRouter = express.Router();

//get all users api only for admin
userRouter.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        data: database.users
    })
});

userRouter.get('/:id', (req, res) => {

    for (let user of database.users) {

        if (user.id === Number(req.params.id)) {

            res.status(200).json({
                status: "success",
                user
            })
            return
        }

    }

    res.status(404).json({
        status: "error",
        message: "User with given id doesn't exist"
    })


});
userRouter.get('/:id/accounts', (req, res) => {
    let userAccounts = []
    for (let account of database.accounts) {
        if (account.user_id === Number(req.params.id)) {
            userAccounts.push(account)
        }
    }
    if (!userAccounts.length) {
        res.status(404).json({
            status: "error",
            message: "User with given id does not have account"
        })
        return
    }

    res.status(200).json({
        status: "success",
        data: userAccounts
    })

});


module.exports = userRouter;