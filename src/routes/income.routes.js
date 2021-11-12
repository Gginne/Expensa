const express = require('express')
const router = express.Router()
const IncomeController = require("../controllers/income.controller")

const authenticate = require("../middleware/authenticate")


router.route("/")
      .get(authenticate, IncomeController.index)
      .post(IncomeController.store)
      

router.route("/delete/:id")
      .delete(authenticate, IncomeController.delete)


module.exports = router