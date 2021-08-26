import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom'

class Logout extends Component {
 
    componentDidMount(){
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
