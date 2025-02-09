import React, { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { totalCoursesContext, totalStudentsContext } from '../../contexts/ContextApi';
import { totalTeachersContext } from '../../contexts/ContextApi';




const ViewOverview = () => {
  const { totalCourses } = useContext(totalCoursesContext);
  const { totalTeachers } = useContext(totalTeachersContext);
  const { totalStudents } = useContext(totalStudentsContext);
  return (
    <div>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Teachers</Card.Title>
              <Card.Text className="fs-2">{totalTeachers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Courses</Card.Title>
              <Card.Text className="fs-2">{totalCourses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text className="fs-2">{totalStudents}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewOverview;
