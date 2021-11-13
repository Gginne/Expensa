import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'


const Navigation = (props) => {

  
    return(
      <div class="shadow rounded">
        <Navbar bg="white" expand="lg">
          <Navbar.Brand href="#home">Expensa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home"><Link to="/">Dashboard</Link></Nav.Link>
              <NavDropdown title="Entries" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"><Link to="/expenses">Expenses</Link></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4"><Link to="/incomes">Incomes</Link></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="New Entry" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"><Link to="/new">Expenses/Income</Link></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Category</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Link to="/logout" className="btn btn-danger btn-sm"><b>logout</b> <i class="fas fa-sign-out-alt"></i></Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
};

export default Navigation;
