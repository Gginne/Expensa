const Model = require('./Model')

class Expense extends Model {
   
    static get table() {
        return "Expenses";
    }

    constructor(cols){
        super(cols)
    }

}

module.exports = Expense