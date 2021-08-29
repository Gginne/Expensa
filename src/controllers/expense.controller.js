const Expense = require('../models/Expense')
const db = require("../database/db")

class ExpenseController{

    //GET - CRUD ROUTES

    static index = async (req, res) => { //Show all memebers of the model

    }

    static create = async (req, res) =>{ //Go to expense creation form
        //const {amout, descriprition} = req.body
        console.log(req.body)
    }

    static edit = async (req, res) => { //Go to edit page form

    }


    static show(req, res){ //Show specific member of the model

    }


    
    //POST - CRUD ROUTES
    static store = async (req, res) => { //Create new expense entry from input data in db
        const {expenses} = req.body
        const resExpenses = []
        expenses.forEach(async (expense) => {
            const {amount, description, category_id, datetime} = expense
            if(amount && description){
                try{
                    const expense = new Expense({amount, description, datetime, category_id, user_id: req.user.id})
                    resExpenses.push(expense.cols)
                    await expense.save()
                } catch(err){
                    return res.status(400).json({message: "Error creating expense"})
                }
                
            } else {
                return res.status(400).json({message: "Missing required fields"})
            }
        })

        return res.status(200).json(resExpenses)
        
    }

    static async update(req, res){ //Update expense data in db

    }
}

module.exports = ExpenseController
