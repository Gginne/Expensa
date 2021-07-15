import React, { Component } from 'react'
import EntryTable from '../components/EntryTable'

class EntryPage extends Component {

    render() {
        return (
        <div class="row">
            <div class="col-12 mt-5">
        
                <h2 class="mb-3">Add Entries</h2>
                <div className="mt-4">
                    <EntryTable />
                </div>
            </div>
        </div>
        )
    }
}

export default EntryPage