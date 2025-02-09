 import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SERVER_URL from '../../services/serverUrl';
import uploadImg from "../../assets/uploadImg.jpg";
import { updateCourseAPI } from '../../services/allApi';
import { editCoursesResponseContext, editServicesResponseContext } from '../../contexts/ContextApi';


const EditCourses = ({ course }) => {
  const {editCoursesResponse,setEditCoursesResponse}=useContext(editCoursesResponseContext)
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [imageFileStatus, setImageFileStatus] = useState(false);
  const [coursesDetails, setCoursesDetails] = useState({
    id:course._id,
    course: course.course,
    category: course.category,
    discription: course.discription,
    courseImg: '',
  });

  useEffect(() => {
    if (
      coursesDetails.courseImg &&
      ['image/png', 'image/jpg', 'image/jpeg'].includes(coursesDetails.courseImg.type)
    ) {
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(coursesDetails.courseImg));
    } else if (coursesDetails.courseImg) {
      setImageFileStatus(false);
      alert('Unsupported file type. Please upload JPEG, JPG, or PNG files.');
    }
  }, [coursesDetails.courseImg]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setPreview('');
    setCoursesDetails({
      id: course._id,
      course: course.course,
      category: course.category,
      discription: course.discription,
      courseImg: '',
    });
  };


 
   

  const handleUpdateCourse = async () => {
    const { id, course, category, discription, courseImg } = coursesDetails;
  
    if (course && category && discription) {
      const reqBody = new FormData();
      reqBody.append("course", course);
      reqBody.append("category", category);
      reqBody.append("discription", discription);
  
      if (courseImg) {
        reqBody.append("courseImg", courseImg);
      }
  
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
  
        try {
          setLoading(true);
          console.log("Sending Request:", { id, reqBody, reqHeader });
          const result = await updateCourseAPI(id, reqBody, reqHeader);
  
          console.log("API Response:", result);
          if (result.status === 200) {
            alert("Course updated successfully!");
            setEditCoursesResponse(result.data); // Update context
            handleClose(); // Close modal
          } else {
            alert(result.response?.data || "An error occurred.");
          }
        } catch (err) {
          console.error("Update Error:", err.response?.data || err.message);
          alert("Failed to update the course. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        alert("No valid token found. Please log in again.");
      }
    } else {
      alert("Please fill the form completely!");
    }
  };
  
  
  return (
    <>
    
      <button onClick={handleShow} className="btn">
        <i className="fa-solid fa-edit"></i>
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) =>
                    setCoursesDetails({ ...coursesDetails, courseImg: e.target.files[0] })
                  }
                />
                <img
                  height="200px"
                  className="img-fluid"
                  src={preview || `${SERVER_URL}/uploads/${course.courseImg}` || uploadImg}
                  alt="Course Preview"
                />
              </label>
              {!imageFileStatus && <p className="text-warning mt-2">Upload JPEG, JPG, or PNG files only.</p>}
            </div>
            <div className="col-lg-8">
              <label>course</label>
              <input
                value={coursesDetails.course}
                onChange={(e) => setCoursesDetails({ ...coursesDetails, course: e.target.value })}
                placeholder="Course Name"
                className="form-control mb-2"
              />
              <label>category</label>
              <input
                value={coursesDetails.category}
                onChange={(e) => setCoursesDetails({ ...coursesDetails, category: e.target.value })}
                placeholder="Category"
                className="form-control mb-2"
              />
              <label>discription</label>
              <textarea
                value={coursesDetails.discription}
                onChange={(e) => setCoursesDetails({ ...coursesDetails, discription: e.target.value })}
                placeholder="Description"
                className="form-control"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleUpdateCourse}disabled={loading}>
          {loading ? "Updating..." : "Update"}
          
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCourses;
 