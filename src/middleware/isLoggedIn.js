require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require('../models/User')

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    if(!token) return res.redirect(301, "/")
    
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        req.user = decoded
        if(User.find(req.user.id)){
            next()
        } else {
            res.redirect(301, "/")
        }

        

    } catch(e){
        console.log(e)
        res.redirect(301, "/")
    }

    
}