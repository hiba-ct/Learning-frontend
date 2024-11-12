
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './components/Contact'
import About from './components/About'
import Services from './components/Services'
import Courses from './components/Courses'
import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import Students from './pages/Students'
import AddCourses from './pages/AddCourses'
import Analitics from './pages/Analitics'
import Settings from './pages/Settings'
function App() {
  
  return (
    <>
       <Header/>
     <Routes>
    
     <Route path='/' element={<Home/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/About' element={<About/>}/>
     <Route path='/services' element={<Services/>}/>
     <Route path='/courses' element={<Courses/>}/>
     <Route path='/admin' element={<Admin/>}/>
     <Route path='/dashboard' element={<AdminDashboard/>}/>
     <Route path='/students' element={<Students/>}/>
     <Route path='/addcourses' element={<AddCourses/>}/>
     <Route path='/analitics' element={<Analitics/>}/>
     <Route path='/settings' element={<Settings/>}/>
     </Routes>
     
    <Footer/>
    </>
  )
}

export default App
