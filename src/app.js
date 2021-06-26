//Imports
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const session = require('express-session');
const isLoggedIn = require('./middleware/isLoggedIn')

//App Setup
const app = express()
app.set('port', process.env.PORT || 5000)
app.set('view engine', 'ejs'); 
app.set('views', 'src/views');

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(session({
    resave: false, 
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET, 
    cookie: {
        maxAge: 3600000,
        expires: false
    }
}));

app.use(function(req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});


//Route imports
const authRoutes = require('./routes/auth.routes')
const expenseRoutes = require('./routes/expense.routes')

//Routes
app.get("/", isLoggedIn, (req, res) => {
    const {user} = req
    res.render('dashboard', {user});
    
})
app.use(authRoutes)
app.use('/expenses', expenseRoutes)


//Export App
module.exports = app

