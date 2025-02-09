import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  updateStudentsAPI } from '../../services/allApi';
import { editStudentsResponseContext } from '../../contexts/ContextApi';



const EditStudents = ({student}) => {
  const {editStudentsResponse,setEditStudentsResponse}=useContext(editStudentsResponseContext)
    const [loading, setLoading] = useState(false);
      const [studentsDetails, setStudentsDetails] = useState({
        id:student._id,
        username:student.username,
        email:student.email,
        mobile_number:student.mobile_number,
        course:student.course,
        duration:student.duration,
        total_fee:student.total_fee,
        pending_fee:student.pending_fee
          
        });
       console.log(studentsDetails) 

        const [show, setShow] = useState(false);
        
          const handleClose = () => {
            setShow(false);
            
           
            setStudentsDetails({
                id:student._id,
                username:student.username,
                email:student.email,
                mobile_number:student.mobile_number,
                course:student.course,
                duration:student.duration,
                total_fee:student.total_fee,
                pending_fee:student.pending_fee
               
            });
          };
        
          const handleShow = () => {
            setShow(true);

            setStudentsDetails({
                id:student._id,
        username:student.username,
        email:student.email,
        mobile_number:student.mobile_number,
        course:student.course,
        duration:student.duration,
        total_fee:student.total_fee,
        pending_fee:student.pending_fee
               
            });
          };
          const handleUpdateStudents = async () => {
              const { id,username,email,mobile_number,course,duration,total_fee,pending_fee  } = studentsDetails;
            
                
                  if (username&&email&&mobile_number&&course&&duration&&total_fee&&pending_fee) {
                    
                    const reqBody = {
                        username,email,mobile_number,course,duration,total_fee,pending_fee
                     
                    };
              
          
                    
                    const token = sessionStorage.getItem("token");
                    if (token) {
                      const reqHeader = {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      };
                
                     
            
                    try {
                      setLoading(true);
                      const result = await updateStudentsAPI(id,reqBody, reqHeader);
                      if (result.status === 200) {
                        alert("student updated successfully!");
                      
                       
                     
                        setEditStudentsResponse(result.data) 
                        handleClose();
                      } else {
                        alert(result.response.data || "An error occurred.");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Failed to update the student. Please try again.");
                    } finally {
                      setLoading(false);
                    }
                   
                  }else{
                    alert("please update again...error")
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
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>username</label>
                <input
                  value={studentsDetails.username}
                  onChange={(e) =>
                    setStudentsDetails({
                      ...studentsDetails,
                      username: e.target.value,
                    })
                  }
                  placeholder="Username"
                  type="text"
                  className="form-control mb-2"
                />
                <label>email</label>
                <input
                  value={studentsDetails.email}
                  onChange={(e) =>
                    setStudentsDetails({ ...studentsDetails, email: e.target.value })
                  }
                  placeholder="Email"
                  type="text"
                  className="form-control mb-2"
                />
                <label>contact</label>
                <input
                  value={studentsDetails.mobile_number}
                  onChange={(e) =>
                    setStudentsDetails({
                      ...studentsDetails,
                      mobile_number: e.target.value,
                    })
                  }
                  placeholder="Mobile Number"
                  type="text"
                  className="form-control mb-2"
                />
                <label>course</label>

<input
                  value={studentsDetails.course}
                  onChange={(e) =>
                    setStudentsDetails({ ...studentsDetails, course: e.target.value })
                  }
                  placeholder="text"
                  type="text"
                  className="form-control mb-2"
                />
                <label>duration</label>

<input
                  value={studentsDetails.duration}
                  onChange={(e) =>
                    setStudentsDetails({ ...studentsDetails, duration: e.target.value })
                  }
                  placeholder="duration"
                  type="text"
                  className="form-control mb-2"
                />
                <label>totalfee</label>

<input
                  value={studentsDetails.total_fee}
                  onChange={(e) =>
                    setStudentsDetails({ ...studentsDetails, total_fee: e.target.value })
                  }
                  placeholder="TotalFee"
                  type="number"
                  className="form-control mb-2"
                />
                <label>pendingfee</label>

<input
                  value={studentsDetails.pending_fee}
                  onChange={(e) =>
                    setStudentsDetails({ ...studentsDetails, pending_fee: e.target.value })
                  }
                  placeholder="pendingFee"
                  type="number"
                  className="form-control mb-2"
                />
                {/* Add other fields similarly */}
              </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdateStudents}variant="danger"disabled={loading}>
          {loading ? "Updating..." : "Update"}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditStudents