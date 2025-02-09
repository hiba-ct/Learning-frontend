import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import profileImg from "../../assets/profileImg.png";
import { addTeachersAPI } from '../../services/allApi';

import { addTeachersResponseContext, totalTeachersContext } from '../../contexts/ContextApi';


const AddTeachers = () => {

   const {addTeachersResponse, setAddTeachersResponse} = useContext(addTeachersResponseContext)
      
          
          
          
const { totalTeachers, setTotalTeachers } = useContext(totalTeachersContext)
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [teachersImageFileStatus, setTeachersImageFileStatus] = useState(false);
  
  const [teachersDetails, setTeachersDetails] = useState({
    name:"",
    email:"",
    contact:"",
    courses:"",

    teachersImg: ""
});

console.log(teachersDetails);

 
  

  

  useEffect(() => {
    if (
     teachersDetails.teachersImg &&
      ["image/png", "image/jpg", "image/jpeg"].includes(teachersDetails.teachersImg.type)
    ) {
      setTeachersImageFileStatus(true);
      setPreview(URL.createObjectURL(teachersDetails.teachersImg));
    } else {
      setTeachersImageFileStatus(false);
      setPreview("");
      setTeachersDetails({ ...teachersDetails, teachersImg: "" });
    }
  }, [teachersDetails.teachersImg]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPreview("");
    setTeachersImageFileStatus(false);
    setTeachersDetails({
      name:"",
    email:"",
    contact:"",
    courses:"",

    teachersImg: ""
    });
  };

  const handleShow = () => setShow(true);

  const handleAddTeachers = async () => {
    const { name,
      email,
      contact,
      courses,
  
      teachersImg } = teachersDetails;

    if (name &&
      email &&
      contact &&
      courses &&
      teachersImg ) {
      const reqBody = new FormData();
      reqBody.append("name",name);
      reqBody.append("email", email);
      reqBody.append("contact", contact);
      reqBody.append("courses", courses);
      reqBody.append("teachersImg", teachersImg);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };

        try {
          setLoading(true);
          const result = await addTeachersAPI(reqBody, reqHeader);
          if (result.status === 200) {
            alert("Teacher added successfully!");
           /*  setAddCourseResponse(result) */
          setAddTeachersResponse([...addTeachersResponse, result.data]);
           setTotalTeachers(totalTeachers + 1);
           const newTeacher = {
             
            name,email,contact,courses,teachersImg
            }; 
             
            handleClose();
          } else {
            alert(result.response.data || "An error occurred.");
          }
        } catch (err) {
          console.error(err);
          alert("Failed to add the teacher. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    } else {
      alert("Please fill the form completely!!!");
    }
  };

  
  return (
    <>
    
        
            <Card.Body>
              <Button variant="success" className="mb-2" onClick={handleShow}>
                Add New Teacher
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row align-items-center">
                    <div className="col-lg-4">
                      <label>
                        <input
                          onChange={(e) =>
                            setTeachersDetails({
                              ...teachersDetails,
                              teachersImg: e.target.files[0],
                            })
                          }
                          type="file"
                          style={{ display: "none" }}
                        />
                        <img
                          height={"200px"}
                          className="img-fluid"
                          src={preview ? preview : profileImg}
                          alt=""
                        />
                      </label>
                      {!teachersImageFileStatus && (
                        <div className="text-warning fw-bolder my-2">
                          Upload only the following file types (jpeg, jpg, png) here!!!
                        </div>
                      )}
                    </div>
                    <div className="col-lg-8">
                      <div className="mb-2">
                        <input
                          value={teachersDetails.name}
                          onChange={(e) =>
                            setTeachersDetails({ ...teachersDetails, name: e.target.value })
                          }
                          placeholder="Name"
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-2">
                        <input
                          value={teachersDetails.email}
                          onChange={(e) =>
                            setTeachersDetails({ ...teachersDetails, email: e.target.value })
                          }
                          placeholder="Email"
                          type="text"
                          className="form-control"
                        />
                      </div>

                      

                      <div className="mb-2">
                        <input
                          value={teachersDetails.contact}
                          onChange={(e) =>
                            setTeachersDetails({ ...teachersDetails, contact: e.target.value })
                          }
                          placeholder="contact"
                          type="number"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-2">
                        <input
                          value={teachersDetails.courses}
                          onChange={(e) =>
                            setTeachersDetails({ ...teachersDetails, courses: e.target.value })
                          }
                          placeholder="Courses"
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
                  <Button onClick={handleAddTeachers} variant="danger"disabled={loading}>
                  {loading ? "Adding..." : "Add"}
                  
                  </Button>
                </Modal.Footer>
              </Modal>

           
            </Card.Body>
         
    </>
  );
};

export default AddTeachers; 