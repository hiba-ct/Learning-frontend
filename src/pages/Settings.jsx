import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const Settings = () => {
  return (
    <>
    <Row>
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
       
     
   
</>
  )
}

export default Settings
