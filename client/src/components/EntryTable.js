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

    handleDelete = id => {
        const {entries} = this.state
        const newEntries = entries.filter((entry) => entry.id !== id )
        this.setState({entries: newEntries})
    }

   
    handleSubmit = () => {
        const {entries} = this.state
        this.props.submit(entries)
      
    }
   
    render() {
        const {entries} = this.state
        const canSubmit = !entries.some(({edit}) => edit) && entries.length > 0
    
        return (
            <div className="bg-white table-responsive shadow-sm rounded">
                <table className="table">
                    <tbody>
                        <Entry save={this.handleSave} setEdit={this.handleEdit} />
                        {entries.map(entry => <Entry {...entry} key={entry.id} 
                                                     save={this.handleSave} 
                                                     setEdit={this.handleEdit} 
                                                     delete={this.handleDelete} /> 
                        )}              
                    </tbody>
                </table>
                {canSubmit && (
                    <div className="float-right p-2">
                        <button className="btn btn-info" onClick={() => this.handleSubmit()}>Submit</button>
                    </div>
                )}  
            </div>
        )
    }
}

export default EntryTable