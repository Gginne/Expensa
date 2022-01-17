//Imports
require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const cookieParser = require('cookie-parser')


//App Setup
const app = express()
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/../client/build')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


//Route imports
const authRoutes = require('./routes/auth.routes')
const expenseRoutes = require('./routes/expense.routes')
const incomeRoutes = require('./routes/income.routes')
const categoryRoutes = require('./routes/category.routes')

//Routes

app.use('/api', authRoutes)
app.use('/api/expenses', expenseRoutes)
app.use('/api/incomes', incomeRoutes)
app.use('/api/categories', categoryRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})



//Export App
module.exports = app

