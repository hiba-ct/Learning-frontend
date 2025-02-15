import React, { useContext } from 'react';
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBook,
  faChartLine,
  faCog,
  faSignOutAlt,
  faChalkboardUser,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import { faServicestack } from '@fortawesome/free-brands-svg-icons';

import ViewServices from './ViewServices';
import ViewTeachers from './ViewTeachers';
import ViewCourses from './ViewCourse';
import ViewStudents from './ViewStudents';
import ViewOverview from './ViewOverview';
import { tokenAuthContext } from '../../contexts/AuthContextApi';

const AdminDashboard = () => {
  const { isAutherised, setIsAutherised } = useContext(tokenAuthContext);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    setIsAutherised(false);
    navigate('/');
  };

  return (
    <Container fluid className="admin-dashboard">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark sidebar d-flex flex-column p-3 vh-100">
          <h3 className="text-light mb-4 text-center">Eduversity Admin</h3>
          <Nav className="flex-column w-100">
            <Nav.Link as={Link} to="/viewcourse" className="text-white sidebar-link">
              <FontAwesomeIcon icon={faBook} className="me-2" />
              Manage Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/viewservices" className="text-white sidebar-link">
              <FontAwesomeIcon icon={faServicestack} className="me-2" />
              Manage Services
            </Nav.Link>
            <Nav.Link as={Link} to="/viewstudents" className="text-white sidebar-link">
              <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
              Manage Students
            </Nav.Link>
            <Nav.Link as={Link} to="/viewteachers" className="text-white sidebar-link">
              <FontAwesomeIcon icon={faChalkboardUser} className="me-2" />
              Manage Teachers
            </Nav.Link>
            <Nav.Link as={Link} to="/viewsettings" className="text-white sidebar-link">
              <FontAwesomeIcon icon={faCog} className="me-2" />
              Settings
            </Nav.Link>
            <Nav.Link as={Link} to="/viewcontact" className="text-white sidebar-link">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Register Students
            </Nav.Link>
            <Nav.Link onClick={logout} className="text-white sidebar-link logout-link">
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="main-content p-4">
          {/* Top Navbar */}
          <Navbar bg="light" expand="lg" className="mb-3 shadow-sm rounded">
            <Container fluid>
              <Navbar.Brand className="fw-bold">Admin Dashboard</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link className="fw-semibold">Welcome, Admin</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Overview Cards */}
          <ViewOverview />

          {/* Main Sections */}
          <Row className="g-4">
            <Col md={6}>
              <Card className="shadow-sm p-3 rounded">
                <ViewCourses tableCourseShow={true} />
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm p-3 rounded">
                <ViewServices tableServiceShow={true} />
              </Card>
            </Col>
          </Row>

          <Row className="g-4 mt-3">
            <Col md={6}>
              <Card className="shadow-sm p-3 rounded">
                <ViewStudents tableStudentShow={true} />
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm p-3 rounded">
                <ViewTeachers tableTeachersShow={true} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
