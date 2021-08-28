const express = require('express')
const router = express.Router()
const AuthController = require("../controllers/auth.controller")
const refresh = require("../middleware/refresh")

router.route("/login")
      .post( AuthController.login)

router.route("/refresh")
      .get(refresh, AuthController.generateTokens)

router.route("/register")
      .post( AuthController.register)

router.route("/logout")
      .post( AuthController.logout)




module.exports = router