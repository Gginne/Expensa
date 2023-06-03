import React, { useState } from "react";



export default function AuthForms({onSubmit}) {
  const [form, setForm] = useState("login");
  
  return (
    <div class="row">
      <div class="col-12 mt-5">
        <h3 class="text-center mb-3">Account</h3>

        <div
          class="card mx-auto shadow p-3 mb-5 bg-body rounded"
          style={{ maxWidth: "26rem" }}
        >
          <div class="card-header">
            <ul
              class="nav nav-tabs card-header-tabs"
              id="auth-tabs"
              role="tablist"
            >
              <li class="nav-item">
                <a class={`nav-link ${form === "login" && "active"}`} href="#login"
                  onClick={() => setForm("login")}
                >
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class={`nav-link ${form === "register" && "active"}`} href="#register" 
                  onClick={() => setForm("register")}
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          <div class="card-body">
            <div class="tab-content mt-3">
              {form === "login" ? (
                <div
                  class={`tab-pane ${form === "login" && "active"}`}
                  role="tabpanel"
                >
                  <form name="login" onSubmit={onSubmit}>
                    <div class="mb-3">
                      <label for="emailOrUsername" class="form-label">
                        Email or Username
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="emailOrUsername"
                        aria-describedby="emailOrUsername"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        name="password"
                        required
                      />
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Log In
                    </button>
                  </form>
                </div>
              ) : (
                <div
                  class={`tab-pane ${form === "register" && "active"}`}
                  id="register"
                  role="tabpanel"
                  aria-labelledby="register-tab"
                >
                  <form name="register" onSubmit={onSubmit}>
                    <div class="mb-3">
                      <label for="email" class="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        aria-describedby="email"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="username" class="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="username"
                        aria-describedby="username"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        name="password"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password2" class="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        name="password2"
                        required
                      />
                    </div>
                    <button type="submit" class="btn btn-success">
                      Register
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

