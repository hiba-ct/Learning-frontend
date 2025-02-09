import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/AuthContextApi';


const Header = () => {
  const { isAutherised,setIsAutherised }=useContext(tokenAuthContext) 
   const navigate =useNavigate()
    const logout = ()=>{
  sessionStorage.clear()
  setIsAutherised(false)
  navigate("/")
    }
  return (
    
    <Navbar collapseOnSelect expand="lg" className="  flex bg-success fixed w-full  ">
      <Container>
        <Navbar.Brand className='text-danger fs-3' href="home">  <FontAwesomeIcon style={{ color:"black" }} icon={faUniversity} className="me-2" />Eduversity</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto ">
            <Link to="/"><Nav.Link className='text-white fs-5 ' href="home">Home</Nav.Link></Link>
            <Link to="/about"><Nav.Link className='text-white fs-5'href="about">About</Nav.Link></Link>
            <Link to="/services"><Nav.Link className='text-white fs-5'href="services">Services</Nav.Link></Link>
           
            
            <div className='ms-auto'>
  <button onClick={logout} className='mt-1 btn btn-link text-white fw-bolder text-decoration-none'>
    Logout <i className='fa-solid fa-right-from-bracket ms-1'></i>
  </button>
</div>

          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
