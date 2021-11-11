const Model = require('./Model')

class Expense extends Model {
   
    static get table() {
        return "Incomes";
    }

    constructor(cols){
        super(cols)
    }

}

module.exports = Expense