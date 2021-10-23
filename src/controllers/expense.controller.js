const Expense = require('../models/Expense')
const Category = require('../models/Category')
const db = require("../database/db")

class ExpenseController{

    //GET - CRUD ROUTES

    static index = async (req, res) => { //Show all memebers of the model
        try{
            let expenses = await Expense.where(`user_id=${req.user.id}`)
            
            
            for(let i = 0; i < expenses.length; i++){
                let category = await Category.find(expenses[i].cols.category_id)
                expenses[i].cols['category_name'] = category.cols.name
            }
           
            
            return res.status(200).json(expenses)
        } catch(err){
            console.log(err)
            return res.status(400).json({message: 'error'})
        }
    }

    static create = async (req, res) =>{ //Go to expense creation form
        //const {amout, descriprition} = req.body
        console.log(req.body)
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

    static async delete(req, res){ //Update expense data in db
        try{
            let expense = await Expense.find(req.params.id)
            expense.delete()
            
            return res.status(200).json(`Expense with id=${req.params.id} was deleted`)
        } catch(err){
            console.log(err)
            return res.status(400).json({message: 'error'})
        }
    }


}

module.exports = ExpenseController
