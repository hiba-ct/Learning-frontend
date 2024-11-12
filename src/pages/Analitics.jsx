import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

const Analitics = () => {
  return (
    <>
    <Row>
     <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Analytics Overview</Card.Header>
                <Card.Body>
                  <p>Graphical representation of course enrollments, active users, etc., can be added here.</p>
                  <Button variant="info">View Detailed Analytics</Button>
                </Card.Body>
              </Card>
            </Col>
            </Row>
            </>
         
  )
}

export default Analitics