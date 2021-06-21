const express = require('express')
const router = express.Router()
const AuthController = require("../controllers/auth.controller")

      
router.route("/login")
      .get( AuthController.signin)
      .post( AuthController.login)

router.route("/register")
      .post( AuthController.register)




module.exports = router