import React, { useContext, useEffect, useState } from "react";
import AddStudents from "./AddStudents";
import { Button, Card, Table } from "react-bootstrap";
import { allStudentsAPI, deleteStudentAPI } from "../../services/allApi";
import EditStudents from "./EditStudents";
import { addStudentsResponseContext, editStudentsResponseContext, totalStudentsContext } from "../../contexts/ContextApi";

const ViewStudents = ({ tableStudentShow }) => {
  const { totalStudents, setTotalStudents } = useContext(totalStudentsContext);
   const {editStudentsResponse}=useContext(editStudentsResponseContext)
  const {addStudentsResponse, setAddStudentsResponse} = useContext(addStudentsResponseContext); 
 
  useEffect(() => {
    getAllStudents();
  }, [editStudentsResponse]);

  const getAllStudents = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await allStudentsAPI(reqHeader);
        if (result.status === 200) {
          setAddStudentsResponse(result.data);
          setTotalStudents(result.data.length)
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteStudents = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        await deleteStudentAPI(id, reqHeader);
      /* onDeleteStudentSuccess() */
        getAllStudents(); // Refresh the list
      } catch (err) {
        console.log(err);
      }
    }
  };

 

  return (
    <div>
      <Card className="mb-4">
        <Card.Header>Manage Students</Card.Header>
        <AddStudents  />
        {!tableStudentShow && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Course</th>
                <th>Duration</th>
                <th>Total Fee</th>
                <th>Pending Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {addStudentsResponse?.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>{student.mobile_number}</td>
                  <td>{student.course}</td>
                  <td>{student.duration}</td>
                  <td>{student.total_fee}</td>
                  <td>{student.pending_fee}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2">
                      <EditStudents student={student} />
                    </Button>
                    <Button
                      onClick={() => deleteStudents(student?._id)}
                      variant="danger"
                      size="sm"
                      className="mt-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default ViewStudents;
