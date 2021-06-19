//Imports
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const authRoutes = require('./routes/auth.routes')

//App Setup
const app = express()
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Routes
app.use(authRoutes)



//Export App
module.exports = app

