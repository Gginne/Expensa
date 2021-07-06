import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import  { Redirect } from 'react-router-dom'

const Navigation = (props) => {

    const handleLogout = () => {
      props.logout()
      return <Redirect to='/' />
    }

    return(
      <div class="shadow rounded">
        <Navbar bg="white" expand="lg">
          <Navbar.Brand href="#home">Expensa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Dashboard</Nav.Link>
              <NavDropdown title="Add New" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Expense/Income</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Category</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button variant="danger" onClick={() => handleLogout()}>Logout</Button>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
};

export default Navigation;
