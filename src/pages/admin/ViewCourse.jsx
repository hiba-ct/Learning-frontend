import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import AddCourses from "./AddCourses";
import EditCourses from "./EditCourses";
import {
  addCourseResponseContext,
  editCoursesResponseContext,
  totalCoursesContext,
} from "../../contexts/ContextApi";
import { allCoursesAPI, deleteCourseAPI } from "../../services/allApi";
import SERVER_URL from "../../services/serverUrl";

const ViewCourses = ({ tableCourseShow }) => {
  const { addCourseResponse } = useContext(addCourseResponseContext);
  const { editCoursesResponse } = useContext(editCoursesResponseContext);
  const { setTotalCourses } = useContext(totalCoursesContext);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    getAllCourses();
  }, [addCourseResponse, editCoursesResponse]);

  const getAllCourses = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await allCoursesAPI(reqHeader);
        if (result.status === 200) {
          setAllCourses(result.data);
          setTotalCourses(result.data.length);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteCourse = async (id) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        await deleteCourseAPI(id, reqHeader);
        getAllCourses();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Card className="mb-4 shadow-lg rounded">
      <Card.Header className="bg-primary text-white text-center fs-5 fw-bold">
        Manage Courses
      </Card.Header>

      <Card.Body>
        {/* Add Course Form */}
        <div className="mb-4">
          <AddCourses />
        </div>

        {/* Courses Table */}
        {!tableCourseShow && (
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Course</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCourses?.length > 0 ? (
                allCourses.map((course, index) => (
                  <tr key={course?._id}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">
                      <img
                        src={`${SERVER_URL}/uploads/${course.courseImg}`}
                        alt={course.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "5%",
                        }}
                      />
                    </td>
                    <td className="align-middle fw-bold">{course.course}</td>
                    <td className="align-middle">{course.category}</td>
                    <td className="align-middle text-truncate" style={{ maxWidth: "150px" }}>
                      {course.discription}
                    </td>
                    <td className="align-middle">
                      <Button variant="warning" size="sm" className="me-2 text-white">
                        <EditCourses course={course} />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteCourse(course?._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No courses available.
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

export default ViewCourses;
