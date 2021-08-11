import React, { Component } from 'react'
import AuthForms from "../components/AuthForms"
import axios from 'axios'

class Authentication extends Component {


    handleLogin = async (data) => {
        try{
            const response = await axios.post("/login", data)
            const{token} = response.data
        
            this.props.auth(token)
    
            this.props.history.push('/dashboard');
        } catch(err){
            console.log(err)
        }
        
    }

    handleRegister = async (data) => {
        try{
            const response = await axios.post("/register", data)
            const{token} = response.data
        
            this.props.auth(token)
    
            this.props.history.push('/dashboard');
        } catch(err){
            console.log(err)
        }
        
     
       
    }

    render() {
        return (
            <div>
                <AuthForms login={this.handleLogin} register={this.handleRegister} />
            </div>
        )
    }
}

export default Authentication