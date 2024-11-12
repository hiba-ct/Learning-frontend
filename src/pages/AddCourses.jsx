import React from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'

const AddCourses = () => {
  return (
    <>
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
</Row>
    </>
  )
}

export default AddCourses
