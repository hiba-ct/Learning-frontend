import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import AddStudents from "./AddStudents";
import EditStudents from "./EditStudents";
import { allStudentsAPI, deleteStudentAPI } from "../../services/allApi";
import {
  addStudentsResponseContext,
  editStudentsResponseContext,
  totalStudentsContext,
} from "../../contexts/ContextApi";

const ViewStudents = ({ tableStudentShow }) => {
  const { totalStudents, setTotalStudents } = useContext(totalStudentsContext);
  const { editStudentsResponse } = useContext(editStudentsResponseContext);
  const { addStudentsResponse, setAddStudentsResponse } = useContext(addStudentsResponseContext);

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
          setTotalStudents(result.data.length);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteStudent = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        await deleteStudentAPI(id, reqHeader);
        getAllStudents(); // Refresh list
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Card className="mb-4 shadow-lg rounded">
      <Card.Header className="bg-primary text-white text-center fs-5 fw-bold">
        Manage Students
      </Card.Header>

      <Card.Body>
        {/* Add Students Form */}
        <div className="mb-4">
          <AddStudents />
        </div>

        {/* Students Table */}
        {!tableStudentShow && (
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-dark">
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
              {addStudentsResponse?.length > 0 ? (
                addStudentsResponse.map((student, index) => (
                  <tr key={student?._id}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle fw-bold">{student.username}</td>
                    <td className="align-middle text-truncate" style={{ maxWidth: "200px" }}>
                      {student.email}
                    </td>
                    <td className="align-middle">{student.mobile_number}</td>
                    <td className="align-middle">{student.course}</td>
                    <td className="align-middle">{student.duration}</td>
                    <td className="align-middle">{student.total_fee}</td>
                    <td className="align-middle">{student.pending_fee}</td>
                    <td className="align-middle">
                      <Button variant="warning" size="sm" className="me-2 text-white">
                        <EditStudents student={student} />
                      </Button>
                      <Button
                        onClick={() => deleteStudent(student?._id)}
                        variant="danger"
                        size="sm"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No students available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default ViewStudents;
