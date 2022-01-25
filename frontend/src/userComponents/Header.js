import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './header.css'

function Header() {
  const navigate = useNavigate()

  return (
  <>
   <Navbar collapseOnSelect expand="lg">
  <div style={{marginLeft:'50px'}}>
  <Navbar.Brand className='logo'>ConnectHERE.™</Navbar.Brand>
  </div>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      
    </Nav>
    <Nav>
      <Nav.Link className='header-menu'>Login</Nav.Link>
      
      <Nav.Link className='header-menu' onClick={()=>{navigate('/registerUser')}}>Register</Nav.Link>
      
      <Nav.Link className='header-menu'>Expert..?</Nav.Link>  
    </Nav>
  </Navbar.Collapse>
</Navbar>
  </>
  );
}

export default Header;
