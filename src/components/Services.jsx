import React, {  useEffect, useState } from 'react';

import { Col, Row } from 'react-bootstrap';

import ServiceCard from './ServiceCard';
import { allServicesAPI } from '../services/allApi';

const Services = () => {
  
  const [allServices, setAllServices] = useState([]);
  console.log(allServices);

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    
    
      try {
        const result = await allServicesAPI();
        if (result.status === 200) {
          setAllServices(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    
  };

  return (
    <>
      <div style={{ paddingTop: '100px' }} className="container-fluid">
        <div className="d-flex justify-content-between">
          <h1>All Services</h1>
        
        </div>

        <Row className="mt-3">
          {allServices?.length>0?
          allServices?.map((service,index) => (
            <Col key={service?._id}
           className='mb-3'
           sm={12} md={6} lg={4}>
           
              <ServiceCard displayDataService={service} index={index}/>
            </Col>
          ))
        :
        <div className='text-danger fw-bolder'>
        service Not found!!!</div>
        }
        </Row>
         
      </div>
    </>
  );
};

export default Services;
