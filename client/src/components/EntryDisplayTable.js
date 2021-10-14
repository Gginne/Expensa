import React, { Component } from 'react'

class EntryDisplayTable extends Component {
   
    render() {
        const {entries} = this.props
        console.log(entries)
        return (
            <div className="bg-white table-responsive shadow-sm rounded">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">category</th>
                            <th scope="col">amount</th>
                            <th scope="col">description</th>
                            <th scope="col">date/time</th>
                            <th scope="col">actions</th>
                        </tr>
     
                    </thead>

                    <tbody>
                        
                        {entries.map(entry => (
                                <tr key={entry.id}>
                                    <td>{entry.category_name}</td>
                                    <td>{entry.amount}</td>
                                    <td>{entry.description}</td>
                                    <td>{entry.datetime}</td>
                                    <td>Actions</td>
                                </tr>
                        ))}
                        
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default EntryDisplayTable