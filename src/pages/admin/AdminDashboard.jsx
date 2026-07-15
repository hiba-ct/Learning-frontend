import React from "react";
import { Navbar, Nav, Row, Col, Card } from "react-bootstrap";

import ViewOverview from "./ViewOverview";
import ViewCourses from "./ViewCourse";
import ViewServices from "./ViewServices";
import ViewStudents from "./ViewStudents";
import ViewTeachers from "./ViewTeachers";

const AdminDashboard = () => {
  return (
    <>

      <Navbar bg="danger" expand="lg" className="mb-4 rounded shadow-sm">
        <Navbar.Brand className="fw-bold ms-3">
          Admin Dashboard
        </Navbar.Brand>

        <Nav className="ms-auto me-3">
          <Nav.Link>Welcome, Admin</Nav.Link>
        </Nav>
      </Navbar>

      <ViewOverview />

      <Row className="g-4 mt-3">

        <Col md={6}>
          <Card className="p-3">
            <ViewCourses tableCourseShow={true} />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3">
            <ViewServices tableServiceShow={true} />
          </Card>
        </Col>

      </Row>

      <Row className="g-4 mt-3">

        <Col md={6}>
          <Card className="p-3">
            <ViewStudents tableStudentShow={true} />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3">
            <ViewTeachers tableTeachersShow={true} />
          </Card>
        </Col>

      </Row>

    </>
  );
};

export default AdminDashboard;