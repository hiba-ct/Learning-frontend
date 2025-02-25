import React, { useContext } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { totalCoursesContext, totalStudentsContext, totalTeachersContext } from "../../contexts/ContextApi";
import { FaChalkboardTeacher, FaBook, FaUserGraduate } from "react-icons/fa"; // Import icons

const ViewOverview = () => {
  const { totalCourses } = useContext(totalCoursesContext);
  const { totalTeachers } = useContext(totalTeachersContext);
  const { totalStudents } = useContext(totalStudentsContext);

  // Define cards data
  const stats = [
    { title: "Total Teachers", value: totalTeachers, icon: <FaChalkboardTeacher />, color: "primary" },
    { title: "Total Courses", value: totalCourses, icon: <FaBook />, color: "success" },
    { title: "Total Students", value: totalStudents, icon: <FaUserGraduate />, color: "danger" },
  ];

  return (
    <div className="container py-4">
      <Row className="g-4">
        {stats.map((stat, index) => (
          <Col md={4} key={index}>
            <Card className={`text-center shadow border-0 bg-dark`}>
              <Card.Body>
                <div className={`text-${stat.color} mb-2`} style={{ fontSize: "2.5rem" }}>
                  {stat.icon}
                </div>
                <Card.Title className="fw-bold">{stat.title}</Card.Title>
                <Card.Text className="fs-2">
                  {stat.value !== undefined ? stat.value : <Spinner animation="border" size="sm" />}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewOverview;
