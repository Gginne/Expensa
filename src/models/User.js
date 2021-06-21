const Model = require('./Model')

class User extends Model {
    static get table() {
        return "Users";
    }

    constructor(cols){
        super(cols)
    }

}

module.exports = User