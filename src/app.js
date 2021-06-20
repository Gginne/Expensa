//Imports
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const session = require('express-session');

//App Setup
const app = express()
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(session({
    resave: false, 
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET, 
    cookie: {maxAge: 60 * 1000 * 30}
}));

//Route imports
const authRoutes = require('./routes/auth.routes')
const expenseRoutes = require('./routes/expense.routes')

//Routes
app.use(authRoutes)
app.use('/expenses', expenseRoutes)



//Export App
module.exports = app

