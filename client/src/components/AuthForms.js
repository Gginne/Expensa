import React, { Component } from 'react'

class AuthForms extends Component {
    constructor(){
        super()
        this.state = {
            formState: 'login'
        }
    }

    changeForm = formState => {
        this.setState({formState})
    }

    render() {
        const {formState} = this.state
        const isLogin = formState === 'login' && 'active'
        const isRegister = formState === 'register' && 'active'
        return (
            <div class="row">
            <div class="col-12 mt-5">
          
                <h3 class="text-center mb-3">Login/Register</h3>
        
                <div class="card mx-auto shadow p-3 mb-5 bg-body rounded" style={{maxWidth: "26rem"}}>

                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="auth-tabs" role="tablist">
                            <li class="nav-item">
                              <a class={`nav-link ${isLogin}`} href="#login" 
                              onClick={() => this.changeForm('login')}>Login</a>
                            </li>
                            <li class="nav-item">
                            <a class={`nav-link ${isRegister}`} href="#register" 
                              onClick={() => this.changeForm('register')}>Register</a>
                            </li>
                        </ul>
                    </div>

                    <div class="card-body">

                        

                        <div class="tab-content mt-3">
                            {formState === 'login' ? (
                            <div class={`tab-pane ${isLogin}`} id="login" role="tabpanel">
                                <form>
                                    <div class="mb-3">
                                        <label for="emailOrUsername" class="form-label">Email or Username</label>
                                        <input type="text" class="form-control" id="emailOrUsername" name="emailOrUsername" aria-describedby="emailOrUsername" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="password" name="password" required />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Log In</button>
                                </form>
                            </div>
                            ) : (
                            <div class={`tab-pane ${isRegister}`}  id="register" role="tabpanel" aria-labelledby="register-tab"> 
                                <form>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" name="email" aria-describedby="email" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="Username" class="form-label">Username</label>
                                        <input type="text" class="form-control" id="username" name="username" aria-describedby="username" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="password" name="password" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="password2" class="form-label">Confirm Password</label>
                                        <input type="password" class="form-control" id="password2" name="password2" required />
                                    </div>
                                    <button type="submit" class="btn btn-success">Register</button>
                                </form>
                            </div>
                            )}

                    </div>
                    </div>
                </div>
        
                
        
            </div>
        </div>
        )
    }
}

export default AuthForms