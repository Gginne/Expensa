import React, { Component } from 'react'

class EntryDisplayTable extends Component {
   
    render() {

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
                        <tr>
                            
                        </tr>
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default EntryDisplayTable