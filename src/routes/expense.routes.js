const express = require('express')
const router = express.Router()
const ExpenseController = require("../controllers/expense.controller")

const authenticate = require("../middleware/authenticate")


router.route("/")
      .post(authenticate, ExpenseController.store)
      




module.exports = router