require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    if(!token) return res.redirect(301, "/");

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        //console.log(decoded)
        req.user = decoded
        next()

    } catch(e){
        return res.redirect(301, "/")
    }
}