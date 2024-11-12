import { faAddressBook, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Contact = () => {
  return (
    <>
      
      <div className="row text-center p-5">
        <h1> <span style={{ color:"white" }}>Contact Us</span> -Get in Touch</h1>
        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
          <FontAwesomeIcon className='fs-3 text-danger' icon={faAddressBook}  />
          <h2>ADDRESS</h2>
          <p>
            2466H 5th Street Parking, King Block,<br /> New York City.
          </p>
        </div>

        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
          <FontAwesomeIcon className='fs-3 text-danger' icon={faEnvelope}  />
          <h2>EMAIL</h2>
          <p>mail@example.com<br />mail@example.com</p>
        </div>

        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
          <FontAwesomeIcon className='fs-3 text-danger' icon={faPhone}  />
          <h2>PHONE</h2>
          <p>
            +1 234 567 8901<br />
            +1 234 567 8901
          </p>
        </div>
      </div>

      <Row className='justify-content-center align-items-center mx-5 px-3'>
        <Col md={6} className="d-flex justify-content-center">
          <Form className="w-75">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Phone Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Your Message</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
              <button className='bg-danger rounded-2 w-50'style={{ height:"40px" }}>Submit</button>
            </div>
          </Form>
        </Col>

        <Col md={6} className='d-flex justify-content-center'>
          <img src="https://plus.unsplash.com/premium_photo-1661909267383-58991abdca51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Contact" width="75%" />
        </Col>
      </Row>
    </>
  );
};

export default Contact;
