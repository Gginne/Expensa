const express = require('express')
const router = express.Router()
const ExpenseController = require("../controllers/expense.controller")

const isLoggedIn = require("../middleware/isLoggedIn")


router.route("/")
      .post(isLoggedIn, ExpenseController.store)
      




module.exports = router