import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Table } from 'react-bootstrap';
import AddCourses from './AddCourses';
import EditCourses from './EditCourses';
import { addCourseResponseContext, editCoursesResponseContext } from '../../contexts/ContextApi';
import { allCoursesAPI, deleteCourseAPI } from '../../services/allApi';
import SERVER_URL from '../../services/serverUrl';
import { totalCoursesContext } from '../../contexts/ContextApi';

const ViewCourses = ({ tableCourseShow }) => { // Destructure props
  const { addCourseResponse} = useContext(addCourseResponseContext);
  const { editCoursesResponse } = useContext(editCoursesResponseContext);
  const { totalCourses, setTotalCourses } = useContext(totalCoursesContext);
 const [allCourses, setAllCourses] = useState([]);
          console.log(allCourses);
        
     useEffect(() => {
         getAllCourses();
       }, [addCourseResponse,editCoursesResponse]);
     
       const getAllCourses = async () => {
         const token = sessionStorage.getItem("token");
         if (token) {
           const reqHeader = {
           "Authorization": `Bearer ${token}`
           }
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
        "Authorization": `Bearer ${token}`
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
  
      <Card className="mb-4">
        <Card.Header>Manage Courses</Card.Header>

        {/* Add Courses Form */}
        <AddCourses />

        {/* Courses Table */}
        {!tableCourseShow && (
          <Table striped bordered hover>
            <thead>
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
                    <td>{index + 1}</td>
                    <td>
        {/* Display course's image */}
        <img
          src={`${SERVER_URL}/uploads/${course.courseImg}`}
          alt={course.name}
          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius:"5%" }}
        />
      </td>
                    <td>{course.course}</td>
                    <td>{course.category}</td>
                    
                    <td>{course.discription}</td>
                   
                    <td>
                      <Button variant="danger" size="sm" className="me-2">
                        <EditCourses course={course} />
                      </Button>
                      <button
                        onClick={() => deleteCourse(course?._id)}
                        className="btn text-warning"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No courses available.</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>

  );
};

export default ViewCourses;
