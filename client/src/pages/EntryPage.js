import React, { Component } from 'react'
import EntryTable from '../components/EntryTable'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

class EntryPage extends Component {
    static contextType = AuthContext

    constructor(props){
        super(props)
        this.state = {}
    }

    toSQLDatetime = d => {
        d = new Date(d)
        return d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
    }

    submitEntries = entries => {
        const {token} = this.context
        
        entries.forEach(async (entry) => {
            const {type, amount, description, datetime} = entry.data
            const entryData = { 
                amount: Number(amount), 
                description, 
                datetime: this.toSQLDatetime(datetime)
            }
            try{
                const res = await axios.post("/"+type, entryData, { 
                headers: {'x-auth-token': token} })
                console.log(res.data)
            } catch(e){
                console.log(e)
            }
        });
    }

    render() {
        const {categories} = this.state
        
        console.log(categories)

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