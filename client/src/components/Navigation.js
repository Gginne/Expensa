import React from "react";
import {NavLink} from "react-router-dom";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'


const Navigation = (props) => {

  
    return(
      <div class="shadow rounded">
        <Navbar bg="white" expand="lg">
          <Navbar.Brand href="#home">Expensa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link><NavLink to="/">Dashboard</NavLink></Nav.Link>
              <NavDropdown title="Entries" id="basic-nav-dropdown">
                <NavDropdown.Item><NavLink to="/expenses">Expenses</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink to="/incomes">Incomes</NavLink></NavDropdown.Item>
              </NavDropdown>
              <Nav.Link><NavLink to="/new">Add Entries</NavLink></Nav.Link>
            </Nav>
            <NavLink to="/logout" className="btn btn-danger btn-sm"><b>logout</b> <i class="fas fa-sign-out-alt"></i></NavLink>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
};

export default Navigation;
