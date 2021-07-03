import React from "react";
import {Link} from "react-router-dom";

const Navigation = () => (

    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow rounded">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="/">Dashboard </a>
            <a class="nav-link" >Expenses</a>
            <a class="nav-link" >Income</a>
          </div>
        </div>
        <form method="POST" action="/logout">
          <button type="submit" class="btn btn-sm btn-danger">Logout</button>
        </form>
      </div>
    </nav>
);

export default Navigation;
