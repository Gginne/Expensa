require("dotenv").config()
const e = require("express");
const User = require("../models/User")

module.exports = (req, res, next) => {
    const {user} = req.session

    if(!user) return res.redirect(301, "/login");

    const isUser = User.find(user.id)
    if(isUser){
        req.user = user
        res.locals.loggedIn = true;
        next()
    } else{
        return res.redirect(301, "/login")
    }
}