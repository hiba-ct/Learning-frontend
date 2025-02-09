import { faArrowRight, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import img1 from '../assets/img1.png';
import CoursesCards from '../components/CoursesCards';
import Services from '../components/Services';
import { getHomeCourseAPI, getHomeServicesAPI, getHomeTeachersAPI } from '../services/allApi';
import ServiceCard from '../components/ServiceCard';
import TeachersCard from '../components/TeachersCard';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';

const Home = () => {
  const [allHomeTeachers,setAllHomeTeachers]=useState([])
  const [allHomeCourses,setAllHomeCourses]=useState([])
  const [allHomeServices,setAllHomeServices]=useState([])

  useEffect(()=>{
    getAllHomeCourses()
        },[])
        const getAllHomeCourses =async()=>{
    try{
        const result = await getHomeCourseAPI()
        if(result.status==200)
    
            setAllHomeCourses(result.data)
        
    }catch(err){
        console.log(err);
    }
        }
    
        console.log(allHomeCourses);


        useEffect(()=>{
    getAllHomeServices()
        },[])
        const getAllHomeServices =async()=>{
    try{
        const result = await getHomeServicesAPI()
        if(result.status==200)
    
            setAllHomeServices(result.data)
        
    }catch(err){
        console.log(err);
    }
        }
    
        console.log(allHomeServices);



        useEffect(()=>{
          getAllHomeTeachers()
              },[])
              const getAllHomeTeachers =async()=>{
          try{
              const result = await getHomeTeachersAPI()
              if(result.status==200)
          
                  setAllHomeTeachers(result.data)
              
          }catch(err){
              console.log(err);
          }
              }
          
              console.log(allHomeTeachers);
       
  return (
    <div className='container-fluid p-4 mb-4 ' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Hero Section */}
      <Row className='mt-5'>
        <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
          <div className='text-center'>
            <h1 className='text-light'>Welcome to <span className='text-success'>Eduversity</span></h1>
            <div className='mt-4'>
              <Link to='/Register'>
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
      <div
  className="rounded shadow d-flex flex-column align-items-center justify-content-center "
 /* style={{
    backgroundImage: `url('https://i0.wp.com/www.nassgap.org/wp-content/uploads/education-background.jpg?ssl=1')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", // Ensures full viewport height
    padding: "20px", // Adds some spacing around the content
  }}  */
>
  <h1 className="mx-5  text-center pt-5">
    Services
  </h1>

  <div className="d-flex flex-wrap justify-content-center mt-5">
    {allHomeServices?.map((service,index) => (
      <Col key={service?._id}
      className='mb-3'
      sm={12} md={6} lg={4}>
         <ServiceCard displayDataService={service}index={index} />
       </Col>
    ))}
  </div>

  <Col xs={12} className="d-flex justify-content-center mt-3">
    <Link to="/services" className="text-decoration-none">
      <button
        className="bg-success text-center rounded text-white mb-5"
        style={{ width: "300px", height: "40px" }}
      >
        Explore All Services
      </button>
    </Link>
  </Col>
</div>


     
          
     
{/* courses section */}
<div className=' mt-5 text-center '>
<h1 className='mb-5'>Popular Courses</h1>

<marquee>
  <div key={(CoursesCards?._id)} className='d-flex'>
    {
      allHomeCourses?.map(courses=>(
        <div className='me-5'>
      
  <CoursesCards displayData={courses}showDescription={true}style={{height:"100px"}}/>
  </div>
))
    }
  </div>

</marquee>
</div>

<div className="rounded shadow d-flex justify-content-center align-items-center pt-5 " >
  <Link to="/register" className="text-decoration-none">
    <button className="btn btn-link mt-5 text-danger text-center"class="btn-hover color-7">
      CLICK HERE TO VIEW MORE COURSES...
    </button>
  </Link>
</div>


{/* Teachers Section */}
<h1 className="mx-5  text-center mt-5">
    Teachers
  </h1>

  <div className=" d-flex flex-wrap justify-content-center mt-5 pb-5">
      <Row className='mt-2 g-3'>
      {allHomeTeachers?.map(teacher => (
      <Col key={teacher?._id}
      className='mb-3'
      sm={12} md={6} lg={4}>
         <TeachersCard displayDataTeachers={teacher}/>
       </Col>
    ))}
        </Row>
        </div>
        
    </div>

    
  );
};

export default Home;
