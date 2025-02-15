
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './components/Contact'
import About from './components/About'
import Services from './components/Services'
import Pgf from './components/Pgf'
import Auth from './pages/Auth'
import Courses from './pages/Courses'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddCourses from './pages/admin/AddCourses'
import ViewCourse from './pages/admin/ViewCourse'
import AddServices from './pages/admin/AddServices'
import ViewServices from './pages/admin/ViewServices'
import ViewTeachers from './pages/admin/ViewTeachers'
import ViewStudents from './pages/admin/ViewStudents'
import ViewSettings from './pages/admin/ViewSettings'
import ViewContacts from './pages/admin/ViewContact'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './contexts/AuthContextApi'
import ChatBox from './components/ChatBox'




function App() {
  const {isAutherised,setIsAutherised}=useContext(tokenAuthContext)
   useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsAutherised(true)
    }else{
      setIsAutherised(false)
    }
  },[isAutherised])
  console.log(isAutherised);
  return (
    <>
       <Header/>
     <Routes>

     <Route path='/'element={<Home/>}/>
      {
        isAutherised &&
        <>
        <Route path='/contact'element={<Contact/>}/>
        <Route path='/chatbox'element={<ChatBox/>}/>
        <Route path='/addservices' element={<AddServices/>}/>
     <Route path='/viewservices' element={<ViewServices/>}/>
     <Route path='/viewcourse' element={<ViewCourse/>}/>
     <Route path='/viewcontact' element={<ViewContacts/>}/>
     <Route path='/courses' element={<Courses/>}/>
     <Route path="/admin-dashboard" element={<AdminDashboard/>} />
     <Route path='/viewstudents' element={<ViewStudents/>}/>
     <Route path='/addcourses' element={<AddCourses/>}/>
     <Route path='/viewteachers' element={<ViewTeachers/>}/>
     <Route path='/viewsettings' element={<ViewSettings/>}/>
      </>
      }
    
    
  {/*    <Route path='/contact' element={isAutherised?<Contact/> : <Navigate to={'/login'}/>}/> */}
     <Route path='/About' element={<About/>}/> 
     <Route path='/services' element={<Services/>}/>
     {/* <Route path='/addservices' element={isAutherised?<AddServices/>: <Navigate to={'/login'}/>}/>
     <Route path='/viewservices' element={isAutherised?<ViewServices/>: <Navigate to={'/login'}/>}/>
     <Route path='/viewcourse' element={isAutherised?<ViewCourse/>: <Navigate to={'/login'}/>}/>
     <Route path='/viewcontact' element={isAutherised?<ViewContacts/>: <Navigate to={'/login'}/>}/>
     <Route path='/courses' element={isAutherised?<Courses/>: <Navigate to={'/login'}/>}/>
     <Route path="/admin-dashboard" element={isAutherised?<AdminDashboard/>: <Navigate to={'/login'}/>} />
     <Route path='/viewstudents' element={isAutherised?<ViewStudents/>: <Navigate to={'/login'}/>}/>
     <Route path='/addcourses' element={isAutherised?<AddCourses/>: <Navigate to={'/login'}/>}/>
     <Route path='/viewteachers' element={isAutherised?<ViewTeachers/>: <Navigate to={'/login'}/>}/>
     <Route path='/viewsettings' element={isAutherised?<ViewSettings/>: <Navigate to={'/login'}/>}/> */}
     <Route path='/login'element={<Auth/>}/>
       <Route path='/Register'element={<Auth insideRegister={true}/>}/>
       <Route path='/*'element={<Pgf/>}/>
     </Routes>
     
    <Footer/>
    </>
  )
}

export default App
