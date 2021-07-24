require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    if(!token) return res.redirect(301, "/")
    
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        req.user = decoded

        next()

    } catch(e){
        console.log(e)
        res.redirect(301, "/")
    }

    
}