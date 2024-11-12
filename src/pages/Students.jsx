import React from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'

const Students = () => {
  return (
    <>
    <Row>
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


    </>
  )
}

export default Students