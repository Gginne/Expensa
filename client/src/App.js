import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import EntryPage from './pages/EntryPage';

import {AuthProvider} from "./context/AuthContext"
import Cookies from 'universal-cookie';

const cookies = new Cookies()

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isAuthenticated: false
    };
  }

  handleAuth = token => {
    cookies.set('token', token, {path: '/', expires: new Date(Date.now() + 3 * 3600 * 1000)})
    this.setState({isAuthenticated: true})
  }

  handleLogout = () => {
    cookies.remove('token')
    this.setState({isAuthenticated: false})
  }


  render() {
    const {isAuthenticated} = this.state
    
    //console.log(cookies.get('token'))
    return (
      <Router>
        <div className="bg-light" style={{ height: '100vh'}}>
          <div className="container">
            <Switch>
      
              {!isAuthenticated ? (
                <Route path="/" component={props => <Authentication {...props} auth={this.handleAuth}/>} />
              ) : (
                <AuthProvider logout={() => this.handleLogout()}>
                  <Route exact path="/" component={props => <Dashboard {...props}/>} />
                  <Route exact path="/dashboard" component={props => <Dashboard {...props}/>} />
                  <Route exact path="/new" component={props => <EntryPage {...props}/>} />
                </AuthProvider>
              )}
            </Switch>
          </div>
        </div>
    </Router>
    )
  }
}

export default App 
