import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'

function Header() {
  return (
  <>
   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
  <div style={{marginLeft:'50px'}}>
  <Navbar.Brand href="#home">Connect a Expert.</Navbar.Brand>
  </div>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      
    </Nav>
    <Nav>
      <Nav.Link href="#deets">Login</Nav.Link>
      <Nav.Link href="#deets">Register</Nav.Link>
      <Nav.Link href="#deets">Expert..?</Nav.Link>  
    </Nav>
  </Navbar.Collapse>
</Navbar>
  </>
  );
}

export default Header;
