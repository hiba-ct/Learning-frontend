import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const servicesData = [
  { title: "Free Online Courses", text: "Aenean tristique, duiid blandit elt ultricies, ligula elit interd ures turpis, a bibendum lib.", number: 1 },
  { title: "Unlimited Courses", text: "Aenean tristique, duiid blandit elt ultricies, ligula elit interd ures turpis, a bibendum lib.", number: 2 },
  { title: "Digital Library", text: "Aenean tristique, duiid blandit elt ultricies, ligula elit interd ures turpis, a bibendum lib.", number: 3 },
  { title: "Best Industry Leaders", text: "Aenean tristique, duiid blandit elt ultricies, ligula elit interd ures turpis, a bibendum lib.", number: 4 },
  { title: "Graduate Courses", text: "Aenean tristique, duiid blandit elt ultricies, ligula elit interd ures turpis, a bibendum lib.", number: 5 },
  { title: "Certificate Courses", text: "Aenean tristique, duiid blandit elt ultricies, ligula elit interd ures turpis, a bibendum lib.", number: 6 },
];

const Services = () => {
  return (

    <Row className="rounded g-5" style={{ width: "100%", height: "auto" }}> 
<h1 className='mx-5 pt-5'><span className='text-white'> Services</span> - We offer</h1>
      {servicesData.map((service, index) => (
        <Col md={4} className="d-flex justify-content-center" key={index}>
          <Card className="mt-5 border" style={{ width: '18rem', height: "300px" }}>
            <Card.Body>
              <Card.Title className="d-flex justify-content-center align-items-center mt-5 p-3 text-danger">
                {service.title}
              </Card.Title>
              <Card.Text className="d-flex justify-content-center align-items-center">
                {service.text}
              </Card.Text>
              <Card.Text className="fs-1 circle-bg-danger">
                {service.number}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Services;
