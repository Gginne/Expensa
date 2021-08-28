import React, { Component } from 'react'
import apiClient from '../helpers/apiClient'

class Logout extends Component {
 
    componentDidMount(){
        apiClient.post("/api/logout")
      
        this.props.logout()

        this.props.history.push("/")
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout
