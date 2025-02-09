import React, { useContext } from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faChartLine, faCog, faSignOutAlt, faChalkboardUser, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import ViewServices from './ViewServices';
import ViewTeachers from './ViewTeachers';
import ViewCourses from './ViewCourse';
import ViewStudents from './ViewStudents';
import { faServicestack } from '@fortawesome/free-brands-svg-icons';
import ViewOverview from './ViewOverview';
import { tokenAuthContext } from '../../contexts/AuthContextApi';

const AdminDashboard = () => {
  const { isAutherised,setIsAutherised }=useContext(tokenAuthContext) 
  const navigate =useNavigate()
  const logout = ()=>{
sessionStorage.clear()
setIsAutherised(false)
navigate("/")
  }
  return (
    <Container fluid className="admin-dashboard">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark sidebar d-flex flex-column align-items-start p=3 text-white   ">
          <h3 className="text-light mb-4">Eduversity Admin</h3>
          <Nav className="flex-column w-100">
            <Nav.Link as={Link} to="/viewcourse" className="text-white">
              <FontAwesomeIcon icon={faBook}  className="me-2" />
              Manage Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/viewservices" className="text-white">
            <FontAwesomeIcon icon={faServicestack} className="me-2" />
              Manage Services
            </Nav.Link>
            <Nav.Link as={Link} to="/viewstudents" className="text-white">
              <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
              Manage Students
            </Nav.Link>
            <Nav.Link as={Link} to="/viewteachers" className="text-white">
            <FontAwesomeIcon icon={faChalkboardUser} className="me-2" />
              Manage Teachers
            </Nav.Link>
           
            <Nav.Link as={Link} to="/viewsettings" className="text-white">
              <FontAwesomeIcon icon={faCog} className="me-2" />
              Settings
            </Nav.Link>

            <Nav.Link as={Link} to="/viewcontact" className="text-white">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Register Students
            </Nav.Link>
            <Nav.Link onClick={logout}as={Link} to="/" className="text-white">
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="main-content">
          {/* Top Navbar */}
          <Navbar bg="light" expand="lg" className="mb-3">
            <Container fluid>
              <Navbar.Brand>Admin Dashboard</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link>Welcome, Admin</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Overview Cards */}
          <ViewOverview/>

          {/* Main Sections */}
          <Row>
            <Col md={6}>
           <ViewCourses tableCourseShow={true}/>
           </Col><Col md={6}>
           <ViewServices tableServiceShow={true}/>
           </Col>
         
          </Row>

          {/* services section */}
<Row>
  <Col md={6}>
<ViewStudents tableStudentShow={true}/>
</Col><Col md={6}>
  <ViewTeachers tableTeachersShow={true}/></Col>
</Row>
        
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
