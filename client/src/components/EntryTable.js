import React, { Component } from 'react'
import { v4 as uuid } from 'uuid';
import Entry from './Entry'

class EntryTable extends Component {
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

   
    render() {
        const {entries} = this.state
        console.log(entries)
        return (
            <div className="bg-white table-responsive shadow-sm rounded">
                <table className="table">
           
                        
                    <tbody>
                        <Entry save={this.handleSave} setEdit={this.handleEdit} />
                        {entries.map(entry => <Entry {...entry} save={this.handleSave} setEdit={this.handleEdit}  /> )}
                      
                    
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EntryTable