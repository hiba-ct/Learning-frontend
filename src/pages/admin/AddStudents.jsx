import { useContext, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { addStudentAPI } from "../../services/allApi";
import { addStudentsResponseContext, totalStudentsContext } from "../../contexts/ContextApi";

const AddStudents = () => {
  const { totalStudents, setTotalStudents } = useContext(totalStudentsContext)
  
  const {addStudentsResponse, setAddStudentsResponse} = useContext(addStudentsResponseContext); 
  const [loading, setLoading] = useState(false);
  const [studentsDetails, setStudentsDetails] = useState({
    username: "",
    email: "",
    mobile_number: "",
    course: "",
    duration: "",
    total_fee: "",
    pending_fee: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setStudentsDetails({
      username: "",
      email: "",
      mobile_number: "",
      course: "",
      duration: "",
      total_fee: "",
      pending_fee: "",
    });
  };

  const handleAddStudents = async () => {
    const { username, email, mobile_number, course, duration, total_fee, pending_fee } = studentsDetails;

    if (username && email && mobile_number && course && duration && total_fee && pending_fee) {
      const reqBody = {
        username,
        email,
        mobile_number,
        course,
        duration,
        total_fee,
        pending_fee,
      };

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        try {
          setLoading(true);
          const result = await addStudentAPI(reqBody, reqHeader);
          if (result.status === 200) {
            alert("Student added successfully!");
         
          setAddStudentsResponse([...addStudentsResponse, result.data]);
               
            setTotalStudents(totalStudents + 1);
            handleClose();
         /*    onAddSuccess() */
          } else {
            alert(result.response?.data || "An error occurred.");
          }
        } catch (err) {
          console.error(err);
          alert("Failed to add the student. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        alert("Authorization token is missing. Please log in again.");
      }
    } else {
      alert("Please fill the form completely!!!");
    }
  };

  return (
    <>
      <Card.Body>
        <Button variant="success" className="mb-2" onClick={() => setShow(true)}>
          Add New Student
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              value={studentsDetails.username}
              onChange={(e) => setStudentsDetails({ ...studentsDetails, username: e.target.value })}
              placeholder="Username"
              type="text"
              className="form-control mb-2"
            />
            <input
              value={studentsDetails.email}
              onChange={(e) => setStudentsDetails({ ...studentsDetails, email: e.target.value })}
              placeholder="Email"
              type="text"
              className="form-control mb-2"
            />
            <input
              value={studentsDetails.mobile_number}
              onChange={(e) => setStudentsDetails({ ...studentsDetails, mobile_number: e.target.value })}
              placeholder="Mobile Number"
              type="text"
              className="form-control mb-2"
            />
            <input
              value={studentsDetails.course}
              onChange={(e) => setStudentsDetails({ ...studentsDetails, course: e.target.value })}
              placeholder="Course"
              type="text"
              className="form-control mb-2"
            />
            <input
              value={studentsDetails.duration}
              onChange={(e) => setStudentsDetails({ ...studentsDetails, duration: e.target.value })}
              placeholder="Duration"
              type="text"
              className="form-control mb-2"
            />
            <input
              value={studentsDetails.total_fee}
              onChange={(e) => setStudentsDetails({ ...studentsDetails, total_fee: e.target.value })}
              placeholder="Total Fee"
              type="number"
              className="form-control mb-2"
            />
            <input
              value={studentsDetails.pending_fee}
              onChange={(e) => setStudentsDetails({ ...studentsDetails, pending_fee: e.target.value })}
              placeholder="Pending Fee"
              type="number"
              className="form-control mb-2"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleAddStudents} variant="danger">
              {loading ? "Adding..." : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </>
  );
};

export default AddStudents;
