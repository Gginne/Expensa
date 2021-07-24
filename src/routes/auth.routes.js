const express = require('express')
const router = express.Router()
const AuthController = require("../controllers/auth.controller")

router.route("/auth")
      .get(AuthController.loginreg)
      
router.route("/login")
      .post( AuthController.login)

router.route("/register")
      .post( AuthController.register)

router.route("/logout")
      .post( AuthController.logout)




module.exports = router