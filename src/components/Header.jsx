import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    
    <Navbar collapseOnSelect expand="lg" className="  flex bg-success fixed w-full ">
      <Container>
        <Navbar.Brand className='text-danger fs-3' href="home">  <FontAwesomeIcon style={{ color:"black" }} icon={faUniversity} className="me-2" />Eduversity</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto ">
            <Link to="/"><Nav.Link className='text-dark fs-5 ' href="home">Home</Nav.Link></Link>
            <Link to="/about"><Nav.Link className='text-dark fs-5'href="about">About</Nav.Link></Link>
            <Link to="/services"><Nav.Link className='text-dark fs-5'href="services">Services</Nav.Link></Link>
           
            
            <NavDropdown title={<span className="text-dark fs-5">Pages</span>}
  id="collapsible-nav-dropdown">
              <Link to="/courses"className="text-decoration-none"><NavDropdown.Item href="courses">Courses</NavDropdown.Item></Link>
             <Link to="/contact"className="text-decoration-none"> <NavDropdown.Item href="contact">
                Contact
              </NavDropdown.Item></Link>
             <Link to="/admin"className="text-decoration-none"> <NavDropdown.Item href="#admin">Admin</NavDropdown.Item></Link>
              
            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
