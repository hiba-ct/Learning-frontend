import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table, Modal } from 'react-bootstrap';
import uploadImg from "../../assets/uploadImg.jpg";
import { addCourseAPI } from '../../services/allApi';
import EditCourses from './EditCourses';
import SERVER_URL from '../../services/serverUrl';
import { addCourseResponseContext } from '../../contexts/ContextApi';
import { totalCoursesContext } from '../../contexts/ContextApi';

const AddCourses = () => {
  
  const { totalCourses, setTotalCourses } = useContext(totalCoursesContext);
const { addCourseResponse, setAddCourseResponse } = useContext(addCourseResponseContext);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [imageFileStatus, setImageFileStatus] = useState(false);
  

   // State for storing courses
  const [coursesDetails, setCoursesDetails] = useState({
    course: "",
    category: "",
    discription: "",
    courseImg: "",
  });


  
 
  
  

  useEffect(() => {
    if (
      coursesDetails.courseImg &&
      ["image/png", "image/jpg", "image/jpeg"].includes(coursesDetails.courseImg.type)
    ) {
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(coursesDetails.courseImg));
    } else {
      setImageFileStatus(false);
      setPreview("");
      setCoursesDetails({ ...coursesDetails, courseImg: "" });
    }
  }, [coursesDetails.courseImg]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPreview("");
    setImageFileStatus(false);
    setCoursesDetails({
      course: "",
      category: "",
      discription: "",
      courseImg: "",
    });
  };

  const handleShow = () => setShow(true);

  const handleAddCourse = async () => {
    const { course, category, discription, courseImg } = coursesDetails;

    if (course && category && discription && courseImg) {
      const reqBody = new FormData();
      reqBody.append("course", course);
      reqBody.append("category", category);
      reqBody.append("discription", discription);
      reqBody.append("courseImg", courseImg);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };

        try {
          setLoading(true);
          const result = await addCourseAPI(reqBody, reqHeader);
          if (result.status === 200) {
            alert("Course added successfully!");
            setAddCourseResponse(result.data)
            setTotalCourses(totalCourses + 1);
          
            const newCourse = {
              id: result.data.id, // Assuming the response includes an ID
              course,
              category,
              discription,
            }; 
             
            handleClose();
          } else {
            alert(result.response.data || "An error occurred.");
          }
        } catch (err) {
          console.error(err);
          alert("Failed to add the course. Please try again.");
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
                Add New Course
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row align-items-center">
                    <div className="col-lg-4">
                      <label>
                        <input
                          onChange={(e) =>
                            setCoursesDetails({
                              ...coursesDetails,
                              courseImg: e.target.files[0],
                            })
                          }
                          type="file"
                          style={{ display: "none" }}
                        />
                        <img
                          height={"200px"}
                          className="img-fluid"
                          src={preview ? preview : uploadImg}
                          alt=""
                        />
                      </label>
                      {!imageFileStatus && (
                        <div className="text-warning fw-bolder my-2">
                          Upload only the following file types (jpeg, jpg, png) here!!!
                        </div>
                      )}
                    </div>
                    <div className="col-lg-8">
                      <div className="mb-2">
                        <input
                          value={coursesDetails.course}
                          onChange={(e) =>
                            setCoursesDetails({ ...coursesDetails, course: e.target.value })
                          }
                          placeholder="Course"
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-2">
                        <input
                          value={coursesDetails.category}
                          onChange={(e) =>
                            setCoursesDetails({ ...coursesDetails, category: e.target.value })
                          }
                          placeholder="Category"
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-2">
                        <input
                          value={coursesDetails.discription}
                          onChange={(e) =>
                            setCoursesDetails({ ...coursesDetails, discription: e.target.value })
                          }
                          placeholder="Enter Description"
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
                  <Button onClick={handleAddCourse} variant="danger"disabled={loading}>
                  {loading ? "Adding..." : "Add"}
                  </Button>
                </Modal.Footer>
              </Modal>

             {/*  <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    
                    <th>Course Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                   {courses.map((course, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                     

                      <td>{course.course}</td>
                      <td>{course.category}</td>
                      <td>{course.discription}</td>
                      <td >
                        
                        <Button variant="warning" size="sm" className="me-2">
                        <EditCourses course={course}/>
                        </Button>



                        <Button variant="danger" size="sm"className='mt-2'>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))} 
                </tbody>
              </Table> */}
            </Card.Body>
         
       
     
    </>
  );
};

export default AddCourses; 