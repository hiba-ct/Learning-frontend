import React, {  useContext, useState } from 'react'
import { Button, Card,  Modal } from 'react-bootstrap'
import { addServiceAPI } from '../../services/allApi';
  import { addServiceResponseContext } from '../../contexts/ContextApi';  




const AddServices = () => {
    const { addServiceResponse, setAddServiceResponse } = useContext(addServiceResponseContext);

const [loading, setLoading] = useState(false);
  const [servicesDetails, setServicesDetails] = useState({
      title:"",
      text:""
     
    });
     console.log(servicesDetails) 
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    
   
    setServicesDetails({
      title:"",
      text:""
      
    });
  };

  const handleShow = () => setShow(true);


 


  const handleAddService = async () => {
    const { title, text } = servicesDetails;
  
      
        if (title && text) {
          
          const reqBody = {
            title,
            text
          
          };
    

          
          const token = sessionStorage.getItem("token");
          if (token) {
            const reqHeader = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            };
      
           
  
          try {
            setLoading(true);
            const result = await addServiceAPI(reqBody, reqHeader);
            if (result.status === 200) {
              alert("service added successfully!");
             /*   setAddServiceResponse(result)  */
             
             setAddServiceResponse([...addServiceResponse, result.data]);
               
              handleClose();
            } else {
              alert(result.response.data || "An error occurred.");
            }
          } catch (err) {
            console.error(err);
            alert("Failed to add the service. Please try again.");
          } finally {
            setLoading(false);
          }
        }
      } else {
        alert("Please fill the form completely!!!");
      }
    };
  
  
  
  return (
   
            <Card.Body>
              <Button variant="success" className="mb-2" onClick={handleShow}>
                Add New Service
              </Button>

              <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Services</Modal.Title>
        </Modal.Header>
       <Modal.Body>
                         <div className="row align-items-center">
                          
                           <div className="col-lg-8">
                             <div className="mb-2">
                               <input
                                 value={servicesDetails.title}
                                 onChange={(e) =>
                                   setServicesDetails({ ...servicesDetails, title: e.target.value })
                                 }
                                 placeholder="title"
                                 type="text"
                                 className="form-control"
                               />
                             </div>
       
                             <div className="mb-2">
                               <input
                                 value={servicesDetails.text}
                                 onChange={(e) =>
                                   setServicesDetails({ ...servicesDetails, text: e.target.value })
                                 }
                                 placeholder="text"
                                 type="text"
                                 className="form-control"
                               />
                             </div>
       
                            
                           </div>
                         </div>
                       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddService}variant="danger"disabled={loading}>
          {loading ? "Adding..." : "Add"}</Button>
        </Modal.Footer>
      </Modal>

            
            </Card.Body>
        
     
  )
}

export default AddServices
