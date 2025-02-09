import React, { useContext, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import authImg from '../assets/landimg.png';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI, loginApi } from '../services/allApi';
import { Spinner } from 'react-bootstrap';
import { tokenAuthContext } from '../contexts/AuthContextApi';

const Auth = ({ insideRegister }) => {
  const { isAutherised,setIsAutherised }=useContext(tokenAuthContext) 
  const [isLogined, setIslogined] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student', // Default role set to 'student'
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (inputData.username && inputData.email && inputData.password && inputData.role) {
      try {
        const result = await registerAPI(inputData);
        if (result.status === 200) {
          alert(`Welcome, please login to explore our website!`);
          
          navigate('/login');
          setInputData({ username: '', email: '', password: '', role: 'student' });
        } else if (result.response?.status === 406) {
          alert(result.response.data || "Registration failed. Please try again.");
          setInputData({ username: '', email: '', password: '', role: 'student' });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please fill the form completely!');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputData.email && inputData.password) {
      try {
        const result = await loginApi(inputData); // Assuming loginApi returns a resolved promise
        const user = result.data.user; // Extract the user object from the response
  
        if (result.status === 200) {
          sessionStorage.setItem("existingUser", JSON.stringify(user)); // Save user data
          sessionStorage.setItem("token", result.data.token); // Save token
          setIsAutherised(true)
          setIslogined(true);
  
          setTimeout(() => {
            if (user.role === "admin") {
              navigate('/admin-dashboard');
            } else if (user.role === "student") {
              navigate('/courses');
            } else {
              alert("Unknown role, please contact support.");
            }
            setIslogined(false);
          }, 2000);
        }
      } catch (err) {
        console.error('Login error:', err);
  
        // Display the error message from the server if available
        if (err.response) {
          alert(err.response.data.message || "Invalid credentials. Please try again.");
        } else {
          alert("Something went wrong. Please try again later.");
        }
      }
    } else {
      alert("Please fill the form completely.");
    }
  };
  

  return (
    <div
      style={{ minHeight: '100vh', width: '100%' }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container w-75">
        <div className="shadow card p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className="img-fluid mx-5" src={authImg} alt="" style={{ width: "80%" }} />
            </div>
            <div className="col-lg-6">
              <h1 className="mt-2">
                <i className="fa-brands "></i> Eduversity
              </h1>
              <h5 className="mt-2">
                Sign {insideRegister ? 'up' : 'in'} to your Account
              </h5>
              <Form>
                {insideRegister && (
                  <>
                    <FloatingLabel controlId="floatingUsername" label="Username"className='mb-3'>
                      <Form.Control
                        value={inputData.username}
                        onChange={(e) =>
                          setInputData({ ...inputData, username: e.target.value })
                        }
                        type="text"
                        placeholder="Username"
                      />
                    </FloatingLabel>

                    {/* Only show the "Select Role" dropdown if the default role is not student */}
                   {/*  {inputData.role !== 'student' && (
                      <FloatingLabel controlId="floatingRole" label="Role" className="mb-3 mt-3">
                        <Form.Select
                          value={inputData.role}
                          onChange={(e) =>
                            setInputData({ ...inputData, role: e.target.value })
                          }
                        >
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">Student</option>
                        </Form.Select>
                      </FloatingLabel>
                    )} */}
                  </>
                )}

                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    value={inputData.email}
                    onChange={(e) =>
                      setInputData({ ...inputData, email: e.target.value })
                    }
                    type="email"
                    placeholder="Email address"
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    value={inputData.password}
                    onChange={(e) =>
                      setInputData({ ...inputData, password: e.target.value })
                    }
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>

                {insideRegister ? (
                  <div className="mt-3">
                    <button onClick={handleRegister} type="button" className="btn btn-success mb-2">
                      Register
                    </button>
                    <p>
                      Existing User? Please Click here to
                      <Link to={'/login'}> Login</Link>
                    </p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <button
                      onClick={handleLogin}
                      type="button"
                      className="btn btn-success d-flex mb-2"
                    >
                      Login
                      {isLogined && <Spinner className="ms-1" animation="border" variant="danger" />}
                    </button>
                    <p>
                      New User? Please Click here to
                      <Link to={'/register'}> Register</Link>
                    </p>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;


/* import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';

const Auth = ({ insideRegister, isAdminAdd, onClose, onAddStudent }) => {
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    role: 'student', // Default role set to 'student'
  });

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (inputData.username && inputData.email) {
      // Add new student
      if (onAddStudent) {
        onAddStudent(inputData); // Pass the new student data back to parent
      }
      if (onClose) onClose(); // Close modal
      // Reset input fields
      setInputData({ username: '', email: '', role: 'student' });
    } else {
      alert('Please fill in all required fields!');
    }
  };

  return (
    <Form>
      <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
        <Form.Control
          value={inputData.username}
          onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
          type="text"
          placeholder="Username"
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingEmail" label="Email Address" className="mb-3">
        <Form.Control
          value={inputData.email}
          onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
          type="email"
          placeholder="Email Address"
        />
      </FloatingLabel>

      <div className="mt-3">
        <button onClick={handleAddStudent} type="button" className="btn btn-success">
          {isAdminAdd ? 'Add Student' : 'Register'}
        </button>
      </div>
    </Form>
  );
};

export default Auth;
 */