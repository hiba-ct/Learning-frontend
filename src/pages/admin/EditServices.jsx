import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateServicesAPI } from '../../services/allApi';

import { editServicesResponseContext } from '../../contexts/ContextApi';

const EditServices = ({service}) => {
  const {editServicesResponse,setEditServicesResponse}=useContext(editServicesResponseContext)
    const [loading, setLoading] = useState(false);
      const [servicesDetails, setServicesDetails] = useState({
        id:service._id,
          title:service.title,
          text:service.text,
          
        });
     /*    console.log(servicesDetails) */

        const [show, setShow] = useState(false);
        
          const handleClose = () => {
            setShow(false);
            
           
            setServicesDetails({
                id:service._id,
                title:service.title,
                text:service.text,
               
            });
          };
        
          const handleShow = () => {
            setShow(true);

            setServicesDetails({
                id:service._id,
                title:service.title,
                text:service.text,
               
            });
          };
          const handleUpdateService = async () => {
              const { id,title, text,  } = servicesDetails;
            
                
                  if (title && text ) {
                    
                    const reqBody = {
                      title,
                      text,
                     
                    };
              
          
                    
                    const token = sessionStorage.getItem("token");
                    if (token) {
                      const reqHeader = {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      };
                
                     
            
                    try {
                      setLoading(true);
                      const result = await updateServicesAPI(id,reqBody, reqHeader);
                      if (result.status === 200) {
                        alert("service updated successfully!");
                      
                       
                     
                        setEditServicesResponse(result.data)
                        handleClose();
                      } else {
                        alert(result.response.data || "An error occurred.");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Failed to update the service. Please try again.");
                    } finally {
                      setLoading(false);
                    }
                  }
                } 
              };
            
        
  return (
    <>
    <button onClick={handleShow} className='btn '><i className='fa-solid fa-edit'></i></button>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                         <div className="row align-items-center">
                          
                           <div className="col-lg-8">
                             <div className="mb-2">
                              <label>title</label>
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
                              <label>text</label>
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
          <Button onClick={handleUpdateService}variant="danger"disabled={loading}>
          {loading ? "Updating..." : "Update"}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditServices