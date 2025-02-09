import React, { useEffect, useState } from "react";
import CoursesCards from "../components/CoursesCards";
import { Col, Row, Button } from "react-bootstrap";
import { allCoursesAPI } from "../services/allApi";

const Courses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6; // Number of courses per page

  useEffect(() => {
    getAllCourses();
  }, []);

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
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Calculate indexes for pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = allCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(allCourses.length / coursesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div style={{ paddingTop: "100px" }} className="container-fluid">
        <div className="d-flex justify-content-between">
          <h1>All Courses</h1>
        </div>

        <Row className="mt-3">
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <Col key={course?._id} className="mb-3" sm={12} md={6} lg={4}>
                <CoursesCards displayData={course} />
              </Col>
            ))
          ) : (
            <div className="text-danger fw-bolder">Course Not Found!!!</div>
          )}
        </Row>

        {/* Pagination Controls */}
        {allCourses.length > coursesPerPage && (
          <div className="d-flex justify-content-center mt-4">
            <Button onClick={prevPage} disabled={currentPage === 1} className="mx-2 bg-dark">
              Previous
            </Button>
            <span className="fw-bold mx-3">Page {currentPage}</span>
            <Button
              onClick={nextPage}
              disabled={currentPage >= Math.ceil(allCourses.length / coursesPerPage)}
              className="mx-2 bg-dark text-decoration-none"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;
