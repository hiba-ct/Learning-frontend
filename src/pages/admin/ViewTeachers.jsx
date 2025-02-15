import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import AddTeachers from "./AddTeachers";
import EditTeachers from "./EditTeachers";
import { allTeachersAPI, deleteTeachersAPI } from "../../services/allApi";
import SERVER_URL from "../../services/serverUrl";
import {
  addTeachersResponseContext,
  editTeachersResponseContext,
  totalTeachersContext,
} from "../../contexts/ContextApi";

const ViewTeachers = ({ tableTeachersShow }) => {
  const { editTeachersResponse } = useContext(editTeachersResponseContext);
  const { totalTeachers, setTotalTeachers } = useContext(totalTeachersContext);
  const { addTeachersResponse, setAddTeachersResponse } = useContext(addTeachersResponseContext);

  useEffect(() => {
    getAllTeachers();
  }, [editTeachersResponse]);

  const getAllTeachers = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await allTeachersAPI(reqHeader);
        if (result.status === 200) {
          setAddTeachersResponse(result.data);
          setTotalTeachers(result.data.length);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteTeacher = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        await deleteTeachersAPI(id, reqHeader);
        getAllTeachers(); // Refresh list
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Card className="mb-4 shadow-lg rounded">
      <Card.Header className="bg-primary text-white text-center fs-5 fw-bold">
        Manage Teachers
      </Card.Header>

      <Card.Body>
        {/* Add Teachers Form */}
        <div className="mb-4">
          <AddTeachers />
        </div>

        {/* Teachers Table */}
        {!tableTeachersShow && (
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {addTeachersResponse?.length > 0 ? (
                addTeachersResponse.map((teacher, index) => (
                  <tr key={teacher?._id}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">
                      <img
                        src={`${SERVER_URL}/uploads/${teacher.teachersImg}`}
                        alt={teacher.name}
                        className="rounded-circle"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td className="align-middle fw-bold">{teacher.name}</td>
                    <td className="align-middle text-truncate" style={{ maxWidth: "200px" }}>
                      {teacher.email}
                    </td>
                    <td className="align-middle">{teacher.contact}</td>
                    <td className="align-middle">{teacher.courses}</td>
                    <td className="align-middle">
                      <Button variant="warning" size="sm" className="me-2 text-white">
                        <EditTeachers teacher={teacher} />
                      </Button>
                      <Button
                        onClick={() => deleteTeacher(teacher?._id)}
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
                  <td colSpan="7" className="text-center text-muted">
                    No teachers available.
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

export default ViewTeachers;
