const express = require('express')
const router = express.Router()
const CategoryController = require("../controllers/category.controller")

const isLoggedIn = require("../middleware/isLoggedIn")

router.route("/")
      .get(isLoggedIn, CategoryController.index)
      


module.exports = router