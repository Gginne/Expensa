const db = require("../database/db")

class Model{
    static get table() {
        return null;
    }

    static get fillable() {
        return null;
    }
    

    //Model constructor 
    constructor(cols){
        this.cols = cols
    }

    //Static methods

    //Find All -- Find by all table members
    static async findAll(){
        try{
            let rows = await db.query(`SELECT * FROM ${this.table}`)
            rows = rows.map(row => new this.prototype.constructor(row))
            if(rows.length == 1) return rows[0];
            else if(rows.length == 0) return null;
            return rows
        } catch(err){
            console.log(err)
        }
        
    }

    //Find -- Find by column id
    static async find(id){
        try{
            const row = await db.query(`SELECT * FROM ${this.table} WHERE id = ${id}`)
            return new this.prototype.constructor(row[0])
        } catch(err){
            console.log(err)
        }
        
    }

    //Where -- Find column by other parameters
    static async where(params){
        try{
            let rows = await db.query(`SELECT * FROM ${this.table} WHERE ${params}`)
            rows = rows.map(row => new this.prototype.constructor(row))
    
            return rows
        } catch(err){
            throw err
        }
        
    }

    //Instance methods

    //Delete -- Deleting column
   async delete(){
        try{
            await db.query(`DELETE FROM ${this.constructor.table} WHERE id = ${this.cols.id}`)
        } catch(err){
            console.log(err)
        }
    }

    //Save -- Saving new column  to table or updating existing one
    async save(){
        try{
            const values = Object.values(this.cols)
            const fields = Object.keys(this.cols)
            const query = `INSERT INTO ${this.constructor.table} (${fields.join()}) VALUES (?)
            ON DUPLICATE KEY UPDATE ${fields.map(field => `${field}=VALUES(${field})`).join()}`
            
            try{
                const result = await db.query(query, [values])
                if(result.insertId) this.cols.id = result.insertId;
            } catch(err){
                console.log(err);
            }
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = Model