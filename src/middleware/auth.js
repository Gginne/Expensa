require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const {token} = req.session
    if(!token) return res.redirect(301, "/login");

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        //console.log(decoded)
        req.user = decoded
        next()

    } catch(e){
        return res.redirect(301, "/login")
    }
}