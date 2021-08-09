//Imports
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const isLoggedIn = require('./middleware/isLoggedIn')

//App Setup
const app = express()
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


//Route imports
const authRoutes = require('./routes/auth.routes')
const expenseRoutes = require('./routes/expense.routes')
const categoryRoutes = require('./routes/category.routes')

//Routes
app.use(authRoutes)
app.use('/expenses', expenseRoutes)
app.use('/categories', categoryRoutes)


//Export App
module.exports = app

