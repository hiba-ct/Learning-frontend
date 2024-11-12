import React from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faChartLine, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  return (
    <Container fluid className="admin-dashboard">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark sidebar d-flex flex-column align-items-start p-3 text-white">
          <h3 className="text-light mb-4">Eduversity Admin</h3>
          <Nav className="flex-column w-100">
            <Nav.Link as={Link} to="/students" className="text-white">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Manage Students
            </Nav.Link>
            <Nav.Link as={Link} to="/addcourses" className="text-white">
              <FontAwesomeIcon icon={faBook} className="me-2" />
              Manage Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/analitics" className="text-white">
              <FontAwesomeIcon icon={faChartLine} className="me-2" />
              Analytics
            </Nav.Link>
            <Nav.Link as={Link} to="/settings" className="text-white">
              <FontAwesomeIcon icon={faCog} className="me-2" />
              Settings
            </Nav.Link>
            <Nav.Link as={Link} to="/admin" className="text-white">
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
          <Row className="mb-4">
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Total Users</Card.Title>
                  <Card.Text className="fs-2">350</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Total Courses</Card.Title>
                  <Card.Text className="fs-2">45</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Active Students</Card.Title>
                  <Card.Text className="fs-2">150</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Main Sections */}
          <Row>
            {/* Manage Courses Section */}
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Manage Courses</Card.Header>
                <Card.Body>
                  <Button variant="success" className="mb-2">Add New Course</Button>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Course Name</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Introduction to Art</td>
                        <td>Art</td>
                        <td>
                          <Button variant="warning" size="sm" className="me-2">Edit</Button>
                          <Button variant="danger" size="sm">Delete</Button>
                        </td>
                      </tr>
                      {/* Add more courses as needed */}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            {/* Manage Students Section */}
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Manage Students</Card.Header>
                <Card.Body>
                  <Button variant="success" className="mb-2">Add New User</Button>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>John Doe</td>
                        <td>john@example.com</td>
                        <td>Student</td>
                        <td>
                          <Button variant="warning" size="sm" className="me-2">Edit</Button>
                          <Button variant="danger" size="sm">Delete</Button>
                        </td>
                      </tr>
                      {/* Add more users as needed */}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Analytics and Settings Section */}
          <Row>
            {/* Analytics Section */}
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Analytics Overview</Card.Header>
                <Card.Body>
                  <p>Graphical representation of course enrollments, active users, etc., can be added here.</p>
                  <Button variant="info">View Detailed Analytics</Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Settings Section */}
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Settings</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Admin Email</Form.Label>
                      <Form.Control type="email" placeholder="admin@eduversity.com" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Enter new password" />
                    </Form.Group>
                    <Button variant="primary">Update Settings</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
