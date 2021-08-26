import React, {Component} from 'react'

import Navigation from '../components/Navigation';
const AuthContext = React.createContext()

class AuthProvider extends Component {
    // Context state
    
    state = {
      token: localStorage.getItem('token')
    }
    
  
    render() {
      const { children} = this.props
      const { token } = this.state
      return (
        <AuthContext.Provider
          value={{
            token,
          }}
        >
            <Navigation/>
            {children}
        
          
        </AuthContext.Provider>
      )
    }
  }

export const AuthConsumer = AuthContext.Consumer
export {AuthProvider} 
export default  AuthContext