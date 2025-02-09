import React, { useContext, useEffect, useState } from 'react';
import { updateTeachersAPI } from '../../services/allApi';
import uploadImg from "../../assets/uploadImg.jpg";
import { Button, Modal } from 'react-bootstrap';
import SERVER_URL from '../../services/serverUrl';
import { editTeachersResponseContext } from '../../contexts/ContextApi';

const EditTeachers = ({ teacher}) => {
  const {editTeachersResponse,setEditTeachersResponse}=useContext(editTeachersResponseContext)
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(`${SERVER_URL}/uploads/${teacher.teachersImg}`);
  const [teachersImageFileStatus, setTeachersImageFileStatus] = useState(false);

  const [teachersDetails, setTeachersDetails] = useState({
    id: teacher._id,
    name: teacher.name,
    email: teacher.email,
    contact: teacher.contact,
    courses: teacher.courses,
    teachersImg: "", // Holds the new image file if uploaded
  });

  useEffect(() => {
    if (
      teachersDetails.teachersImg &&
      ["image/png", "image/jpg", "image/jpeg"].includes(teachersDetails.teachersImg.type)
    ) {
      setTeachersImageFileStatus(true);
      setPreview(URL.createObjectURL(teachersDetails.teachersImg));
    } else if (!teachersDetails.teachersImg) {
      // No new image selected, use existing preview
      setPreview(`${SERVER_URL}/uploads/${teacher.teachersImg}`);
    }
  }, [teachersDetails.teachersImg, teacher.teachersImg]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPreview(`${SERVER_URL}/uploads/${teacher.teachersImg}`);
    setTeachersImageFileStatus(false);
    setTeachersDetails({
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      contact: teacher.contact,
      courses: teacher.courses,
      teachersImg: "",
    });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleUpdateTeachers = async () => {
    const { id, name, email, contact, courses, teachersImg } = teachersDetails;

    if (name && email && contact && courses) {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("email", email);
      reqBody.append("contact", contact);
      reqBody.append("courses", courses);

      // Include the new image file if uploaded; otherwise, use the existing image
      if (teachersImg) {
        reqBody.append("teachersImg", teachersImg);
      }

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };

        try {
          setLoading(true);
          const result = await updateTeachersAPI(id, reqBody, reqHeader);
          if (result.status === 200) {
            alert("Teacher updated successfully!");

            // Call the parent callback function if provided
          setEditTeachersResponse(result.data);

            handleClose();
          } else {
            alert(result.response.data || "An error occurred.");
          }
        } catch (err) {
          console.error(err);
          alert("Failed to update the teacher. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn">
        {/* <i className="fa-solid fa-edit"></i> */}Edit
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
          <Modal.Title>Edit Teachers</Modal.Title>
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
                  src={preview || uploadImg}
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
                <label>name</label>
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
                <label>email</label>
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
                <label>contact</label>
                <input
                  value={teachersDetails.contact}
                  onChange={(e) =>
                    setTeachersDetails({ ...teachersDetails, contact: e.target.value })
                  }
                  placeholder="Contact"
                  type="number"
                  className="form-control"
                />
              </div>

              <div className="mb-2">
                <label>course</label>
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
          <Button onClick={handleUpdateTeachers} variant="danger" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTeachers;
