import React, { Component } from 'react'
import EntryTable from '../components/EntryTable'
import apiClient from '../helpers/apiClient'
import {getCategories} from "../helpers/functions"
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

    submitEntries = entries => {
        
        entries.forEach(async (entry) => {
            const {type, amount, description, datetime, category} = entry.data
            const entryData = { 
                amount: Number(amount), 
                category_id: Number(category),
                description, 
                datetime: this.toSQLDatetime(datetime)
            }
            try{
                const res = await apiClient.post("/api/"+type, entryData)
                console.log(res.data)
            } catch(e){
                console.log(e)
            }
        });
    }

    render() {
        const {categories} = this.state

        return (
        <div class="row">
            <div class="col-12 mt-5">
        
                <h2 class="mb-3">Add Entries</h2>
                <div className="mt-4">
                    <EntryTable submit={this.submitEntries} categories={categories}/>
                </div>
            </div>
        </div>
        )
    }
}

export default EntryPage