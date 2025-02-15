import { faAddressBook, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {  submitAPI } from '../services/allApi';
import ChatBox from './ChatBox';
import AdminChat from '../pages/admin/AdminChat';
import { Link } from 'react-router-dom';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  
  const [inputData, setInputData] = useState({
    fullname: '',
    email: '',
    contact: '',
    message:'',
    course:''
  });

 



  const handleSubmit = async (e) => {
     /*  e.preventDefault(); */
      if (inputData.fullname && inputData.email && inputData.contact && inputData.message) {
        try {
          const result = await submitAPI(inputData);
          if (result.status === 200) {
            alert(`Welcome ${result.data?.fullname},Your Response Noted`);
            
          } else if (result.response?.status === 406) {
            alert(result.response.data || "Submision failed. Please try again.");
            setInputData({  fullname: '',
              email: '',
              contact: '',
              message:'' });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        alert('Please fill the form completely!');
      }
    };
  
  return (
    <>
    
      
    <div className="container text-center py-5">
  <h1>
    <span style={{ color: "white" }}>Contact Us</span> - Get in Touch
  </h1>
  
  <div className="row g-4 mt-4">
    <div className="col-md-4 col-12 d-flex flex-column align-items-center">
      <FontAwesomeIcon className="fs-3 text-danger" icon={faAddressBook} />
      <h2>ADDRESS</h2>
      <p>
        2466H 5th Street Parking, King Block,<br /> New York City.
      </p>
    </div>

    <div className="col-md-4 col-12 d-flex flex-column align-items-center">
      <FontAwesomeIcon className="fs-3 text-danger" icon={faEnvelope} />
      <h2>EMAIL</h2>
      <p>mail@example.com<br />mail@example.com</p>
    </div>

    <div className="col-md-4 col-12 d-flex flex-column align-items-center">
      <FontAwesomeIcon className="fs-3 text-danger" icon={faPhone} />
      <h2>PHONE</h2>
      <p>
        +1 234 567 8901<br />
        +1 234 567 8902
      </p>
    </div>
  </div>
</div>


      <Row className='justify-content-center align-items-center mx-5 px-3'>
        <Col md={6} className="d-flex justify-content-center">
          <Form className="w-75">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control   value={inputData.fullname}
                    onChange={(e) =>
                      setInputData({ ...inputData, fullname: e.target.value })
                    }
                    type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control   value={inputData.email}
                    onChange={(e) =>
                      setInputData({ ...inputData, email: e.target.value })
                    }
                    type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control   value={inputData.contact}
                    onChange={(e) =>
                      setInputData({ ...inputData, contact: e.target.value })
                    }
                    type="text" placeholder="Phone Number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
  <Form.Label>Course</Form.Label>
  <Form.Select 
    value={inputData.course}
    onChange={(e) =>
      setInputData({ ...inputData, course: e.target.value })
    }
   
  >
    <option  value="" >Select a Course</option>
    <option value="Web Development">Web Development</option>
    <option value="Data Science">Data Science</option>
    <option value="Cyber Security">Cyber Security</option>
    <option value="Cloud Computing">Cloud Computing</option>
    <option value="Dentisty">Dentisty</option>
    <option value="Psychology">Psychology</option>
    <option value="Mobile App">Mobile App</option>
    <option value="Software Development">Software development</option>
    <option value="Networking">Networking</option>
    <option value="Businee Management">Business Mangement</option>
    <option value="Hospital Administration">Hospital Administration</option>
    <option value="Others">Others</option>
  </Form.Select>
</Form.Group>



            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Your Message</Form.Label>
              <Form.Control   value={inputData.message}
                    onChange={(e) =>
                      setInputData({ ...inputData, message: e.target.value })
                    }
                    as="textarea" rows={3} />
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
              <button onClick={handleSubmit}className='bg-danger rounded-2 w-50'style={{ height:"40px" }}>Submit</button>
            </div>
          </Form>
        </Col>

        <Col md={6} className="d-flex flex-column align-items-center">
  <img 
    src="https://plus.unsplash.com/premium_photo-1661909267383-58991abdca51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="Contact" 
    width="75%" 
    className="mb-3"
  />
  <Link to="/chatbox">
    <button className="btn btn-success px-4 py-2 mt-3">Chatbox →</button>
  </Link>
</Col>

       
      </Row>
      
    </>
  );
}; 


export default Contact;
