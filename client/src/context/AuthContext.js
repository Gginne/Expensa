import React, {Component} from 'react'
import Cookies from 'universal-cookie';
import Navigation from '../components/Navigation';

const AuthContext = React.createContext()
const cookies = new Cookies();

class AuthProvider extends Component {
    // Context state
    
    state = {
      token: cookies.get('token')
    }

    componentDidUpdate(){
      //console.log(cookies.get('token'))
      if(!cookies.get('token')){
        this.props.logout()
      }
    }
    
    // Method to update state
    setToken = (token) => {
      this.setState({token})
    }
  
    render() {
      const { children, logout } = this.props
      const { token } = this.state
      const { setToken } = this
      return (
        <AuthContext.Provider
          value={{
            token,
            setToken,
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