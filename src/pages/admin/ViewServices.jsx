import React, { useContext, useEffect } from 'react';
import { addServiceResponseContext, editServicesResponseContext } from '../../contexts/ContextApi';
import { Button, Card, Col, Table } from 'react-bootstrap';
import { allServicesAPI, deleteServiceAPI } from '../../services/allApi';
import AddServices from './AddServices';
import EditServices from './EditServices';


const ViewServices = ({ tableServiceShow }) => { // Destructure props
    const {editServicesResponse}=useContext(editServicesResponseContext)
  const { addServiceResponse, setAddServiceResponse } = useContext(addServiceResponseContext);

  useEffect(() => {
    getAllServices();
  }, [editServicesResponse]);

  const getAllServices = async () => {
    try {
      const response = await allServicesAPI(); // Fetch all services from API
      if (response.status === 200) {
        setAddServiceResponse(response.data); // Update context with fetched data
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const deleteService =async(id)=>{
    const token = sessionStorage.getItem("token");
  
    if (token) {
      
    //api call
      const reqHeader = {
         
          "Authorization": `Bearer ${token}`
      };
  
      try{
  await deleteServiceAPI(id,reqHeader)
  getAllServices()
      }catch(err){
        console.log(err);
      }
  }
  }

  return (
   
      <Card className="mb-4">
        <Card.Header>Manage Services</Card.Header>

        {/* Add Services Form */}
        <AddServices />

        {/* Services Table */}
        {!tableServiceShow && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {addServiceResponse.map((service, index) => (
                <tr key={service?._id}>
                  <td>{index + 1}</td>
                  <td>{service.title}</td>
                  <td>{service.text}</td>
                  <td>
                  <Button variant="danger" size="sm" className="me-2">
                        <EditServices service={service}/>
                        </Button>

                        <button onClick={()=>deleteService(service?._id) } className='btn text-warning'><i className='fa-solid fa-trash'></i></button>
                        

                        
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}


      </Card>

  );
};

export default ViewServices;
