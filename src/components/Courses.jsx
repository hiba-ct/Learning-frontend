import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Row, Col, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const courseData = [
  {
    title: 'Graduation Course',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    img: 'https://p.w3layouts.com/demos_new/template_demo/08-09-2018/eduversity_demo_Free/695053153/web/images/image3.jpg',
  },
  {
    title: 'Art Course',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    img: 'https://p.w3layouts.com/demos_new/template_demo/08-09-2018/eduversity_demo_Free/695053153/web/images/image2.jpg',
  },
  {
    title: 'Library Course',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    img: 'https://p.w3layouts.com/demos_new/template_demo/08-09-2018/eduversity_demo_Free/695053153/web/images/image1.jpg',
  },
  {
    title: 'Designing Course',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    img: 'https://p.w3layouts.com/demos_new/template_demo/08-09-2018/eduversity_demo_Free/695053153/web/images/image2.jpg',
  },
  {
    title: 'Abroad Courses',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    img: 'https://s3.amazonaws.com/coursesity-blog/2019/04/qtq80-ALbAUd-1500x1000.jpeg',
  },
  {
    title: 'Online Course',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    img: 'https://p.w3layouts.com/demos_new/template_demo/08-09-2018/eduversity_demo_Free/695053153/web/images/image3.jpg',
  },
];

const Courses = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <h1 className='px-5'>Popular Courses</h1>
        {courseData.map((course, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="d-flex justify-content-center mb-4">
            <Card style={{ width: '100%', maxWidth: '22rem' }}>
              <Card.Img variant="top" src={course.img} />
              <Card.Body>
                <Card.Title className='text-white'>{course.title}</Card.Title>
                <Card.Text>{course.text}</Card.Text>
                <Link to="/contact"><Button variant="danger"><FontAwesomeIcon icon={faGraduationCap} />Join Now</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Courses;
