import React, { Component } from 'react'
import { v4 as uuid } from 'uuid';

import Entry from './Entry'

class EntryFormTable extends Component {

    constructor(){
        super()
        this.state = {
            entries: []
        }
    }

   
    handleSave = (newEntry) => {
        const {entries} = this.state
        const {id, data} = newEntry
        if(!id){
            this.setState({entries: [...entries, {id: uuid(), edit: false, data}]})
        } else{
            const newEntries = entries.map((entry) => entry.id === id ? {id, edit: false, data} : entry)
            this.setState({entries: newEntries})
        }
    }

    handleEdit = id => {
        const {entries} = this.state
        const newEntries = entries.map((entry) => entry.id === id ? {...entry, edit: true} : entry)
        this.setState({entries: newEntries})
    }

    handleDelete = id => {
        const {entries} = this.state
        const newEntries = entries.filter((entry) => entry.id !== id )
        this.setState({entries: newEntries})
    }

   
    handleSubmit = () => {
        const {entries} = this.state
        this.props.submit(entries)
        this.setState({entries: []})
    }
   
    render() {
        const {entries} = this.state
        const {categories} = this.props

        const canSubmit = !entries.some(({edit}) => edit) && entries.length > 0
    
        const expenseSum = entries.reduce((accum, {data}) => (data.type === "expenses" ? Number(data.amount) + accum : 0), 0)
        
        const incomeSum = entries.reduce((accum, {data}) => (data.type === "incomes" ? Number(data.amount) + accum : 0), 0)

        return (
            <div className="bg-white table-responsive shadow-sm rounded">
                <table className="table">
                    <thead>
                        <Entry save={this.handleSave} categories={categories} setEdit={this.handleEdit}/>
                        
                    </thead>
                    <tbody>
                        
                        {entries.map(entry => <Entry {...entry} key={entry.id} 
                                                     categories={categories}
                                                     save={this.handleSave} 
                                                     setEdit={this.handleEdit} 
                                                     delete={this.handleDelete} /> 
                        )}              
                    </tbody>
                    {canSubmit && (
                        <tfoot>
                            <tr>
                                <td colSpan="4">
                                    <div className="float-right">
                                        <h6>Total Expenses </h6> <span class="badge badge-danger">${expenseSum}</span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <h6>Total Income </h6> <span class="badge badge-success">${incomeSum}</span>
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-info btn-block" onClick={() => this.handleSubmit()}>Submit </button>
                                </td>
                            </tr>
                        </tfoot>
                    )}  
                    
                </table>
                
            </div>
        )
    }
}

export default EntryFormTable