import { faBook, faChalkboardUser, faGraduationCap, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
  // State for animated numbers
  const [graduates, setGraduates] = useState(0);
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [courses, setCourses] = useState(0);

  // Increment function
  const incrementNumber = (finalValue, setter) => {
    let start = 1;
    const increment = Math.ceil(finalValue / 100);
    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        setter(finalValue);
        clearInterval(timer);
      } else {
        setter(start);
      }
    }, 20); // Adjust speed of animation here
  };

  useEffect(() => {
    incrementNumber(450, setGraduates);
    incrementNumber(1000, setStudents);
    incrementNumber(145, setTeachers);
    incrementNumber(268, setCourses);
  }, []);

  return (
    <>
      <div className='p-5 rounded shadow'>
        <h1 className='mx-3 mt-3'>About Us :</h1>
        <Row className='justify-content-center align-items-center p-3'>
          <Col md={4}>
            <h4 className='text-success'>Start your career</h4>
            <p>Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictum lacinia, nisl est posuere nulla, nec egestas leo mi id lorem. Maecenas sem nulla</p>
            <p>Maecenas sem nulla dignissim</p>
            <p>Dignissim magna idesn molestie</p>
            <p>Nulla congue, ex init dictum int</p>
            <p>Sed gravida dignissim magna idesn</p>
            <p>Dignissim magna idesn molestie</p>
          </Col>

          <div className='col-md-8'>
            <Row className="g-5">
              <Col md={4}>
                <h4 className='text-success'>Start your career</h4>
                <p>Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictum lacinia, nisl est posuere nulla, nec egestas leo mi id lorem. Maecenas sem nulla</p>
              </Col>
              <Col md={4}>
                <h4 className='text-success'>Great Confidence</h4>
                <p>Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictum lacinia, nisl est posuere nulla, nec egestas leo mi id lorem. Maecenas sem nulla</p>
              </Col>
              <Col md={4}>
                <h4 className='text-success'>Success your Future</h4>
                <p>Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictum lacinia, nisl est posuere nulla, nec egestas leo mi id lorem. Maecenas sem nulla</p>
              </Col>
            </Row>
            <Row className="g-2">
              <Col md={4}>
                <h4 className='text-success'>Finalize your skill</h4>
                <p>Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictum lacinia, nisl est posuere nulla, nec egestas leo mi id lorem. Maecenas sem nulla</p>
              </Col>
              <Col md={4}>
                <h4 className='text-success'>Start your career</h4>
                <p>Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictum lacinia, nisl est posuere nulla, nec egestas leo mi id lorem. Maecenas sem nulla</p>
              </Col>
              <Col md={4}>
                <h4 className='text-success'>Start your career</h4>
                <p>Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictum lacinia, nisl est posuere nulla, nec egestas leo mi id lorem. Maecenas sem nulla</p>
              </Col>
            </Row>
          </div>

          <Col md={4} className="text-center">
            <div className="d-flex justify-content-center align-items-center">
              <Link to="/about" className="text-decoration-none">
                
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      <div className='bg-black border rounded w-75 mx-auto p-5'>
        <Row className='justify-content-center'>
          <Col md={6}>
            <div className='row d-flex justify-content-around text-center mb-3'>
              <Col md={2}>
                <h3><FontAwesomeIcon icon={faUserGraduate} /></h3>
                <h3>{graduates}</h3>
                <p>Graduates</p>
              </Col>
              <Col md={2}>
                <h3><FontAwesomeIcon icon={faGraduationCap} /></h3>
                <h3>{students}</h3>
                <p>Students</p>
              </Col>
              <Col md={2}>
                <h3><FontAwesomeIcon icon={faChalkboardUser} /></h3>
                <h3>{teachers}</h3>
                <p>Teachers</p>
              </Col>
              <Col md={2}>
                <h3><FontAwesomeIcon icon={faBook} /></h3>
                <h3>{courses}</h3>
                <p>Courses</p>
              </Col>
            </div>
          </Col>

          <Col md={4} className="d-flex flex-column justify-content-center align-items-start">
            <h3 >Facts of our University</h3>
            <p>
              Vestibulum venenatis leo eget ex aliqua inm, vel tincidunt justo facilisis.
              Nuncin egestas lacus in velit aliquam, sed exit rutrum ex tempor. Nam vel feugiat odi.
              Pellentesque efficitur dapibus augue.
            </p>
          </Col>
        </Row>
      </div>

      <div className='row mx-5 mt-3 d-flex justify-content-center align-items-center'>
        <div className='col-md-6 d-flex flex-column justify-content-center'>
          <h1><span className='text-white'>History</span> - About Our University</h1>
          <h5>History of our University</h5>
          <p >
            Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictu lacinia,
            nislen est posuere nulla, nec egestas leo mi id lorem. Maecenas sem nulla.
            Maecenas risus enim, pharetra accumsan nulla vitae, mollis hendrerit orci.
            Pellentesque nec purus eu tortor molestie fringilla ut sit amet mauris.
            Maecenas mattis eleifend lacus non condimentum. Elit Donec fringilla nisi risus,
            at ullamcorper augue blandit sit amet.

            Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictu lacinia,
            nislen est posuere nulla, nec egestas leo mi id lorem.
          </p>
        </div>

        <div className='col-md-6 d-flex justify-content-center'>
          <img
            src="https://th.bing.com/th/id/OIP.uz-BImU35yCfrVdS9DmmggHaEK?rs=1&pid=ImgDetMain"
            alt="University History"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </>
  );
};

export default About;
