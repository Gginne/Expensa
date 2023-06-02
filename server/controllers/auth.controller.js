const User = require('../models/User')
const bcrypt = require('bcrypt')
const db = require("../database/db")
const jwt = require("jsonwebtoken")

class AuthController{

    static generateTokens = async (req, res) => {
        const { 
            REFRESH_SECRET, 
            ACCESS_SECRET, 
            REFRESH_EXPIRATION, 
            ACCESS_EXPIRATION 
        } = process.env

        const {user} = req

        const refreshToken = jwt.sign(user, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION+'s' });
        const accessToken = jwt.sign(user,  ACCESS_SECRET, { expiresIn: ACCESS_EXPIRATION+'s' });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true, 
            secure: true 
        });

        return {token: accessToken}
    }


    static register = async (req, res) =>{
        //Create new user in database
        let {email, username, password, password2} = req.body

        if(!email || !username || !password || !password2){
            console.log('mismatch')
            return res.status(400).json({message:'Please fill in all the fields'});
        }
        if(password != password2){
            console.log('mismatch2')
            return res.status(400).json({message:'Passwords dont match'});
        }
        

        const foundEmail = await User.where(`email='${email}'`)
        const foundUsername = await User.where(`username='${username}'`)
        if(foundEmail.length == 0 || foundUsername.length == 0){
            console.log('found user or email')
            if(foundEmail.length == 0) return res.status(400).json({message: "Email already exists"});
            if(foundEmail.length == 0) return res.status(400).json({message: "Username already exists"});
        } else {
            try{
                const salt = await bcrypt.genSaltSync(10)
                password = await bcrypt.hash(password, salt);
                const newUser = new User({email, username, password})
                await newUser.save()
                //Send message and authentication key
                const {id} = newUser.cols

                req.user = {email, username, id}
                const tokens = await this.generateTokens(req,res)
                return res.status(200).json(tokens)
            } catch(err){
                console.log(err)
                

            }
        }

    }

    static login = async (req, res) => {
        const {emailOrUsername, password} = req.body
    
        if (emailOrUsername && password) {
            //Get user from model
            const [user] = await User.where(`email='${emailOrUsername}' OR username='${emailOrUsername}'`)
            const bcryptPassword = bcrypt.compareSync(password, user ? user.cols.password : '');
            console.log(password)
            if(user && bcryptPassword){
                //Send message and authentication key
                const {email, username, id} = user.cols

                req.user = {email, username, id}

                const tokens = await this.generateTokens(req,res)
                return res.status(200).json(tokens)
            } else {
                return res.status(400).json({message: 'Invalid Username/email or password'})
            }
        } else {
             return res.status(400).json({message: 'Please enter Username/Email and Password!'});
        }

    }

    
    static logout = async (req, res) => {
        console.log("logging out...")
        res.clearCookie('refresh_token')
        return res.status(200).json({auth: false, message: "Logged out"})
    }


}

module.exports = AuthController