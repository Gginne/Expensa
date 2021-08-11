import React, {Component} from 'react'
import Cookies from 'universal-cookie';

const AuthContext = React.createContext()
const cookies = new Cookies();

class AuthProvider extends Component {
    // Context state
    
    state = {
      token: cookies.get('token')
    }
    
    // Method to update state
    setToken = (token) => {
      this.setState({token})
    }
  
    render() {
      const { children } = this.props
      const { token } = this.state
      const { setToken } = this
      console.log(token)
      return (
        <AuthContext.Provider
          value={{
            token,
            setToken,
          }}
        >
            
            {children}
        
          
        </AuthContext.Provider>
      )
    }
  }

export const AuthConsumer = AuthContext.Consumer
export {AuthProvider} 
export default  AuthContext