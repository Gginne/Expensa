require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const {token} = req.session
    if(!token) return res.redirect(301, "/")

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        //console.log(decoded)
        req.user = decoded
        next()

    } catch(e){
        res.redirect(301, "/")
    }
}