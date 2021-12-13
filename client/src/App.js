import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import EntryPage from './pages/EntryPage';
import Expenses from './pages/Expenses'
import Incomes from './pages/Incomes'
import Logout from './components/Logout';

import {AuthProvider} from "./context/AuthContext"


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isAuthenticated: Boolean(localStorage.getItem('token'))
    };
  }

  handleAuth = token => {
    localStorage.setItem('token', token);
    this.setState({isAuthenticated: true})
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({isAuthenticated: false})
  }


  render() {
    const {isAuthenticated} = this.state
    
    //console.log(cookies.get('token'))
    return (
     
      <Router>
        <div className="bg-light" style={{ height: '100vh'}}>
          <div className="custom-container">
            <Switch>
      
              {!isAuthenticated ? (
                <Route path="/" component={props => <Authentication {...props} auth={this.handleAuth}/>} />
              ) : (
                <AuthProvider>
                  <Route exact path="/" component={props => <Dashboard {...props}/>} />
                  <Route exact path="/dashboard" component={props => <Dashboard {...props}/>} />
                  <Route exact path="/expenses" component={props => <Expenses {...props}/>} />
                  <Route exact path="/incomes" component={props => <Incomes {...props}/>} />
                  <Route exact path="/new" component={props => <EntryPage {...props}/>} />
                  <Route exact path="/logout" component={props => <Logout {...props} logout={this.handleLogout} />} />
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
