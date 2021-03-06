const express = require('express')
const router = express.Router()
const ExpenseController = require("../controllers/expense.controller")

const authenticate = require("../middleware/authenticate")


router.route("/")
      .get(authenticate, ExpenseController.index)
      .post(authenticate, ExpenseController.store)
      

router.route("/delete/:id")
      .delete(authenticate, ExpenseController.delete)


module.exports = router