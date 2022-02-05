import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './header.css'

function Header() {
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
if(userInfo==null){
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
        <Nav.Link className='header-menu' onClick={()=>{navigate('/login')}}>Login</Nav.Link>
        
        <Nav.Link className='header-menu' onClick={()=>{navigate('/registerUser')}}>Register</Nav.Link>
        
        <Nav.Link className='header-menu' onClick={()=>{navigate('/expertSignUp')}}>Expert..?</Nav.Link>  
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    </>
    );
}else if(userInfo.user){
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
        <Nav.Link className='header-menu' onClick={()=>{
          localStorage.removeItem('userInfo');
          navigate('/')}}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    </>
    );
}else if(userInfo.expert){
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
        <Nav.Link className='header-menu' onClick={()=>{
          navigate('/expertProfile')}}>Profile</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link className='header-menu' onClick={()=>{
          localStorage.removeItem('userInfo');
          navigate('/')}}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    </>
    );
}
}
export default Header;
