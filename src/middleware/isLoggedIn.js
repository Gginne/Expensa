require("dotenv").config()
const User = require("../models/User")

module.exports = (req, res, next) => {
    const {user} = req.session

    if(!user) return res.redirect(301, "/auth");

    const isUser = User.find(user.id)
    if(isUser){
        req.user = user
        res.locals.loggedIn = true;
        next()
    } else{
        return res.redirect(301, "/auth")
    }
}