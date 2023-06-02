import React, { Component } from 'react'
import EntryFormTable from '../components/EntryFormTable'
import CategoryForm from '../components/CategoryForm'
import apiClient from '../helpers/apiClient'
import {getCategories} from "../helpers/utils"


class EntryPage extends Component {

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

    toSQLDatetime = d => d.replace('T', ' ')+":00";
    
    
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
                console.log(entryData.datetime)
                if(type === "expense") expenses.push(entryData);   
                if(type === "income") incomes.push(entryData);   
            });
    
            await apiClient.post("/api/expenses", {expenses})
            await apiClient.post("/api/incomes", {incomes})
       
        
    }

    submitCategory = async(category) => {
        await apiClient.post("/api/categories", category)
        const categories = await getCategories()
        this.setState({categories})
    }

    render() {
        const {categories} = this.state

        return (
        <div class="row">
            <div class="col-12 mt-5">
        
                <h4 class="mb-3">Add Categories</h4>
                
                <div className="mt-4">
                    <CategoryForm submit={this.submitCategory}/>
                </div>
            </div>
            <div class="col-12 mt-4">
        
                <h4 class="mb-3">Add Entries</h4>
                
                <div className="mt-4">
                    <EntryFormTable submit={this.submitEntries} categories={categories}/>
                </div>
            </div>
        </div>
        )
    }
}

export default EntryPage