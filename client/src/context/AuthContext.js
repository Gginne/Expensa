import React, {Component} from 'react'

import Navigation from '../components/Navigation';
const AuthContext = React.createContext()

class AuthProvider extends Component {
    // Context state
    
    state = {
      token: localStorage.getItem('token')
    }
    
  
    render() {
      const { children, logout } = this.props
      const { token } = this.state
      return (
        <AuthContext.Provider
          value={{
            token,
          }}
        >
            <Navigation logout={logout}/>
            {children}
        
          
        </AuthContext.Provider>
      )
    }
  }

export const AuthConsumer = AuthContext.Consumer
export {AuthProvider} 
export default  AuthContext