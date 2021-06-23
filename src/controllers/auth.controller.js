const User = require('../models/User')
const bcrypt = require('bcrypt')
const db = require("../database/db")
//const {generateKey} = require("../test/keys")
const jwt = require("jsonwebtoken")
class AuthController{

    static signin(req, res){
        if(req.session.user){
            res.redirect('/')
        } else {
            res.render('login')
        }
        
    }

    static async register(req, res){
        //Create new user in database
        let {email, username, password, password2} = req.body

        if(!email || !username || !password || !password2){
            res.status(400).json({message:'Please fill in all the fields'});
        }
        if(password != password2){
            res.status(400).json({message:'Passwords dont match'});
        }

        const foundEmail = await User.where(`email='${email}'`)
        const foundUsername = await User.where(`username='${username}'`)
        if(foundEmail || foundUsername){
            if(foundEmail) return res.status(400).json({message: "Email already exists"});
            else if(foundUsername) return res.status(400).json({message: "Username already exists"});
        } else {
            try{
                const salt = await bcrypt.genSaltSync(10)
                password = await bcrypt.hash(password, salt);
                const newUser = new User({email, username, password})
                await newUser.save()
                //Send message and authentication key
                const {id} = newUser.cols
                req.session.user = {email, username, id}
                return res.status(200).json({token})
            } catch(err){
                console.log(err)
                return res.status(400).json({message: "Unsuccessfully registered"})

            }
        }
        

    }

    static async login(req, res){
        const {emailOrUsername, password} = req.body
        //console.log(req.body)
        if (emailOrUsername && password) {
            //Get user from model
            const user = await User.where(`email='${emailOrUsername}' OR username='${emailOrUsername}'`)
            const bcryptPassword = bcrypt.compareSync(password, user ? user.cols.password : '');
            //console.log(bcryptPassword)
            if(user && bcryptPassword){
                //Send message and authentication key
                const {email, username, id} = user.cols
                req.session.user = {email, username, id}
                return res.redirect("/")
                //return res.status(200).json({token})
            } else {
                return res.redirect("/")
                //return res.status(400).json({message: 'Invalid Username/email or password'})
            }
        } else {
            return res.redirect("/")
           // return res.status(400).json({message: 'Please enter Username/Email and Password!'});
        }

    }

    static logout(req, res){
        req.session.destroy();
        res.redirect("/login")
    }


}

module.exports = AuthController