const Expense = require('../models/Expense')
const db = require("../database/db")

class ExpenseController{

    //GET - CRUD ROUTES

    static index(req, res){ //Show all memebers of the model

    }

    static create(req, res){ //Go to expense creation form
        //const {amout, descriprition} = req.body
        console.log(req.body)
    }

    static edit(req, res){ //Go to edit page form

    }


    static show(req, res){ //Show specific member of the model

    }


    
    //POST - CRUD ROUTES
    static async store(req, res){ //Create new expense entry from input data in db
        const {amount, description, datetime} = req.body
        console.log(req.body)
        if(amount && description){
            try{
                const expense = new Expense({amount, description, datetime, user_id: req.user.id})
                await expense.save()
                res.status(200).json(expense.cols)
            } catch(err){
                return res.status(400).json({message: "Error creating expense "})
            }
            
        } else {
            return res.status(400).json({message: "Missing required fields "})
        }
    }

    static async update(req, res){ //Update expense data in db

    }
}

module.exports = ExpenseController
