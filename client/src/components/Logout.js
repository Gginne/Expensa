import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom'
import apiClient from '../helpers/apiClient'

class Logout extends Component {
 
    componentDidMount(){
        apiClient("/logout")
        this.props.logout()
        return <Redirect to="/" />
        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout
