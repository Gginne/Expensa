const express = require('express')
const router = express.Router()
const CategoryController = require("../controllers/category.controller")

const authenticate = require("../middleware/authenticate")

router.route("/")
      .get(authenticate, CategoryController.index)
      .post(authenticate, CategoryController.store)
      


module.exports = router