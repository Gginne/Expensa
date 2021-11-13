import React, { Component } from 'react'
import EntryFormTable from '../components/EntryFormTable'
import apiClient from '../helpers/apiClient'
import {getCategories} from "../helpers/utils"
import AuthContext from '../context/AuthContext'


class EntryPage extends Component {
    static contextType = AuthContext

    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
    }

    async componentDidMount(){
        const categories = await getCategories()
        this.setState({categories})
    }

    toSQLDatetime = d => {
        d = new Date(d)
        return d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
    }

    submitEntries = async (entries) => {
       
            let expenses = []
            let incomes = []
            entries.forEach((entry) => {
                const {type, amount, description, datetime, category} = entry.data
                const entryData = { 
                    amount: Number(amount), 
                    category_id: Number(category),
                    description, 
                    datetime: this.toSQLDatetime(datetime)
                }
                
                if(type === "expense") expenses.push(entryData);   
                if(type === "income") incomes.push(entryData);   
            });
    
            const resExp = await apiClient.post("/api/expenses", {expenses})
            const resInc = await apiClient.post("/api/incomes", {incomes})
       
        
    }

    render() {
        const {categories} = this.state

        return (
        <div class="row">
            <div class="col-12 mt-5">
        
                <h2 class="mb-3">Add Entries</h2>
                <div className="mt-4">
                    <EntryFormTable submit={this.submitEntries} categories={categories}/>
                </div>
            </div>
        </div>
        )
    }
}

export default EntryPage