import React, { useContext, useEffect, useState } from 'react'

import { allTeachersAPI, deleteTeachersAPI } from '../../services/allApi';
import { Button, Card, Col, Table } from 'react-bootstrap';
import AddTeachers from './AddTeachers';
import SERVER_URL from '../../services/serverUrl';
import EditTeachers from './EditTeachers';
import { addTeachersResponseContext, editTeachersResponseContext, totalTeachersContext } from '../../contexts/ContextApi';



const ViewTeachers = ({tableTeachersShow}) => {
     const {editTeachersResponse}=useContext(editTeachersResponseContext)
       const { totalTeachers, setTotalTeachers } = useContext(totalTeachersContext);
       const {addTeachersResponse, setAddTeachersResponse} = useContext(addTeachersResponseContext)
    
        
        
        
          useEffect(() => {
            getAllTeachers();
          }, [editTeachersResponse]);
        
          const getAllTeachers = async () => {
            const token = sessionStorage.getItem("token");
            if (token) {
              const reqHeader = {
              "Authorization": `Bearer ${token}`
              }
              try {
                const result = await allTeachersAPI(reqHeader);
                if (result.status === 200) {
                  setAddTeachersResponse(result.data);
                  setTotalTeachers(result.data.length)
                }
              } catch (err) {
                console.log(err);
              }
            }
          };


           const deleteTeachers =async(id)=>{
              const token = sessionStorage.getItem("token");
            
              if (token) {
                
              //api call
                const reqHeader = {
                   
                    "Authorization": `Bearer ${token}`
                };
            
                try{
            await deleteTeachersAPI(id,reqHeader)
            getAllTeachers()
                }catch(err){
                  console.log(err);
                }
            }
            }

          
          

  return (
 
     
     <Card className="mb-4">
 <Card.Header>Manage Teachers</Card.Header>
        {/* Add Services Form */}
        <AddTeachers  />
       
        {/* Services Table */}
        {!tableTeachersShow && (
          <Table striped bordered hover>
            <thead>
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
              {addTeachersResponse.map((teacher, index) => (
                <tr key={teacher?._id}>
                  <td>{index + 1}</td>
                  <td>
        {/* Display teacher's image */}
        <img
          src={`${SERVER_URL}/uploads/${teacher.teachersImg}`}
          alt={teacher.name}
          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
        />
      </td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.contact}</td>
                  <td>{teacher.courses}</td>

                  <td>
                   <Button variant="warning" size="sm" className="me-2">
                        <EditTeachers

                         teacher={teacher}/>
                        </Button>

                        <button onClick={()=>deleteTeachers(teacher?._id) } className='btn text-white bg-danger mt-2'>Delete</button>
                        
 
                        
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}


      </Card>
   
  )
}

export default ViewTeachers