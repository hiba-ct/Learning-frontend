import { faArrowRight, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import img1 from '../assets/img1.png';

const Home = () => {
  const servicesData = [
    { title: "Free Online Courses", text: "Aenean tristique, duiid blandit elt ultricies, ligula elit interd ures turpis, a bibendum lib.", number: 1 },
    { title: "Unlimited Courses", text: "Aenean tristique, duiid blandit elt ultricies, ligula elit interd ures turpis, a bibendum lib.", number: 2 },
    { title: "Digital Library", text: "Aenean tristique, duiid blandit elt ultricies, ligula elit interd ures turpis, a bibendum lib.", number: 3 },
  ];

  return (
    <div className='container-fluid p-4 mb-4 ' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Hero Section */}
      <Row className='mt-5'>
        <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
          <div className='text-center'>
            <h1 className='text-light'>Welcome to <span className='text-success'>Eduversity</span></h1>
            <div className='mt-4'>
              <Link to='/courses'>
                <button className='btn btn-outline-light bg-danger me-2'>
                  Our Courses
                  <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
                </button>
              </Link>
              <Link to='/about'>
                <button className='btn btn-outline-light bg-success'>
                  Read More
                  <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
                </button>
              </Link>
            </div>
          </div>
        </Col>
        <Col md={6} className='d-flex justify-content-center align-items-center mt-5'>
          <img src={img1} alt="Eduversity" width={'70%'} />
        </Col>
      </Row>

      {/* Divider */}
      <div className='bg-success  mt-4 w-full' style={{ width: "100%", height: "40px" }}></div>

      {/* About Us Section */}
      <div className='p-5 rounded shadow'>
        <h1 className='mx-3 mt-3'>About Us :</h1>
        <Row className='justify-content-center align-items-center p-3'>
          <Col md={4}>
            <h4 className='text-success'>Start your career</h4>
            <p> Sed gravida dignissim magna idesn molestie. Nulla congue, ex init dictum lacinia, nisl est posuere nulla, nec egestas leo mi id lorem. Maecenas sem nulla</p>
            <p><FontAwesomeIcon className='mx-2 text-success' icon={faHandPointRight} />Maecenas sem nulla dignissim</p>
            <p><FontAwesomeIcon className='mx-2 text-success'icon={faHandPointRight} />Dignissim magna idesn molestie</p>
            <p><FontAwesomeIcon className='mx-2 text-success'icon={faHandPointRight} />Nulla congue, ex init dictum int</p>
            <p><FontAwesomeIcon className='mx-2 text-success'icon={faHandPointRight} />Sed gravida dignissim magna idesn</p>
          
            <Col md={4} className="text-center">
            <div className="d-flex justify-content-center align-items-center">
              <Link to="/about" className="text-decoration-none">
                <button className="bg-success text-center rounded text-white d-flex justify-content-center align-items-center" style={{ width: "200%", height: "40px" }}>
                  Read More
                </button>
              </Link>
            </div>
          </Col>
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

         
        </Row>
      </div>
      {/* Services Section */}
      <Row className="rounded shadow g-5 " style={{ width: "100%" }}>
        {servicesData.map((service, index) => (
          <Col md={4} key={index} className="d-flex justify-content-center">
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
        <Col xs={12} className="d-flex justify-content-center mt-3">
          <Link to="/services" className="text-decoration-none">
            <button className="bg-success text-center rounded text-white mb-5" style={{ width: "300px", height: "40px" }}>
              Explore All Services
            </button>
          </Link>
        </Col>
      </Row>

      {/* Teachers Section */}
      <marquee>
        <Row className='mt-5 g-3'>
          {[
            { name: 'Filmr Doe', role: 'Teacher', image: 't1.jpg' },
            { name: 'Jaye Smith', role: 'Teacher', image: 't2.jpg' },
            { name: 'Mike Arney', role: 'Teacher', image: 't3.jpg' },
            { name: 'Mary Jane', role: 'Teacher', image: 't4.jpg' },
          ].map((teacher, index) => (
            <Col md={3} key={index} className="d-flex justify-content-center">
              <Card style={{ width: '18rem' }}>
                <Card.Img 
                  variant="top" 
                  src={`https://p.w3layouts.com/demos_new/template_demo/08-09-2018/eduversity_demo_Free/695053153/web/images/${teacher.image}`} 
                  alt={`${teacher.name}`} 
                />
                <Card.Body>
                  <Card.Title className='d-flex justify-content-center text-info'>
                    {teacher.name} <span className='text-light'> : {teacher.role}</span>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </marquee>

    </div>
  );
};

export default Home;
