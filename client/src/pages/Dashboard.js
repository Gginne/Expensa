import React, { Component } from 'react'
import AuthContext from '../context/AuthContext'

class Dashboard extends Component {
    static contextType = AuthContext
    
    render() {
        const {token} = this.context
        console.log(token)
        return (
            <div class="row">
                <div class="col-12 mt-5">
            
                    <h2 class="mb-3">Welcome</h2>

                </div>
            </div>
        )
    }
}
export default Dashboard
