import React, {Component} from 'react'

import Navigation from '../components/Navigation';
import Cookies from 'universal-cookie';
const AuthContext = React.createContext()
const cookies = new Cookies();

class AuthProvider extends Component {
    // Context state
    
    state = {
      token: cookies.get('token')
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