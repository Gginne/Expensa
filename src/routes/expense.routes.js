const express = require('express')
const router = express.Router()
const ExpenseController = require("../controllers/expense.controller")

const auth = require("../middleware/auth")


router.route("/")
      .post(auth, ExpenseController.store)
      




module.exports = router