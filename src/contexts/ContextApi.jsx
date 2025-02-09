import { createContext, useState } from "react";
export const addTeachersResponseContext = createContext();
export const addCourseResponseContext = createContext();
export const addServiceResponseContext = createContext();
export const editServicesResponseContext = createContext()
  export const editTeachersResponseContext = createContext()
  export const editCoursesResponseContext = createContext()
  export const editStudentsResponseContext = createContext()
  export const addStudentsResponseContext = createContext()
  export const totalCoursesContext = createContext();
  export const totalTeachersContext = createContext();
  export const totalStudentsContext = createContext();







const ContextApi = ({ children }) => {
  const [addTeachersResponse, setAddTeachersResponse] = useState([]); 
  const [addStudentsResponse, setAddStudentsResponse] = useState([]); 
  const [addCourseResponse, setAddCourseResponse] = useState([]); 
  const [addServiceResponse, setAddServiceResponse] = useState([]); 
  const [editServicesResponse,setEditServicesResponse]=useState("")
  const [editTeachersResponse,setEditTeachersResponse]=useState("")
  const [editCoursesResponse,setEditCoursesResponse]=useState("")
  const [editStudentsResponse,setEditStudentsResponse]=useState("")
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  
  return (
    <editStudentsResponseContext.Provider value={{editStudentsResponse,setEditStudentsResponse}}>
    <editCoursesResponseContext.Provider value={{editCoursesResponse,setEditCoursesResponse}}>
    <editTeachersResponseContext.Provider value={{editTeachersResponse,setEditTeachersResponse}}>
    <editServicesResponseContext.Provider value={{editServicesResponse,setEditServicesResponse}}>
    <addServiceResponseContext.Provider value={{ addServiceResponse, setAddServiceResponse }}>
    <addCourseResponseContext.Provider value={{ addCourseResponse, setAddCourseResponse }}>
    <addStudentsResponseContext.Provider value={{ addStudentsResponse, setAddStudentsResponse }}>
    <addTeachersResponseContext.Provider value={{ addTeachersResponse, setAddTeachersResponse }}>
    <totalCoursesContext.Provider value={{ totalCourses, setTotalCourses }}>
    <totalTeachersContext.Provider value={{ totalTeachers, setTotalTeachers }}>
    <totalStudentsContext.Provider value={{ totalStudents, setTotalStudents }}>

      {children}
      </totalStudentsContext.Provider>
      </totalTeachersContext.Provider>
      </totalCoursesContext.Provider>
      </addTeachersResponseContext.Provider>
      </addStudentsResponseContext.Provider>
      </addCourseResponseContext.Provider>
    </addServiceResponseContext.Provider>
    </editServicesResponseContext.Provider>
    </editTeachersResponseContext.Provider>
    </editCoursesResponseContext.Provider>
    </editStudentsResponseContext.Provider>
  );
};

export default ContextApi;
