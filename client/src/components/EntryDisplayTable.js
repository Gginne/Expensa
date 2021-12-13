import React, { Component } from 'react'

class EntryDisplayTable extends Component {

    formatDateTime = (dateString) => {
        let date = new Date(dateString)
        console.log(date)
        return date.toLocaleString()
    }


    render() {
        const {entries} = this.props
        console.log(entries)
        return (
            <div className="bg-white table-responsive shadow rounded">
                <table className="table">
                    <thead>
                        <tr>
                            {this.props.showType && <th scope="col">type</th> }
                            <th scope="col">category</th>
                            <th scope="col">amount</th>
                            <th scope="col">description</th>
                            <th scope="col">date/time</th>
                            <th scope="col">delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                        {entries.length ? (entries.map(entry => (
                                <tr key={entry.id}>
                                    {this.props.showType && <td>{entry.type}</td> }
                                    <td>{entry.category_name}</td>
                                    <td>{entry.amount}</td>
                                    <td>{entry.description}</td>
                                    <td>{this.formatDateTime(entry.datetime)}</td>
                                    <td>
                                        <button class="btn btn-sm btn-danger" onClick={() => this.props.delete(entry.id)}>
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                        ))) : (
                            <tr>
                                <td colSpan={5}>
                                    <h2 className="mt-2 text-center text-muted">
                                        NO EXPENSES
                                    </h2>

                                </td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default EntryDisplayTable