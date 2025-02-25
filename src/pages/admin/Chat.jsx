import React, { useState, useEffect } from "react";
import { getallregistersAPI } from "../../services/allApi";
import { Table, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useChat } from "../../contexts/ContextApi"; // Import the ChatContext hook

const Chat = () => {
  const [registersDetails, setRegistersDetails] = useState([]);
  const navigate = useNavigate();
  const { setSelectedUser } = useChat(); // Get the function to set user

  useEffect(() => {
    getAllRegisters();
  }, []);

  const getAllRegisters = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Authorization token is missing");
      return;
    }

    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await getallregistersAPI(reqHeader);
      if (result.status === 200) {
        setRegistersDetails(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Chat Button Click
  const handleChat = (user) => {
    setSelectedUser(user); // Set selected user in Context API
    navigate(`/chatbox/${user._id}`); // Navigate to chatbox
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center text-primary mb-4">📩 Chat Messages</h3>
      <div className="table-responsive">
        <Table striped bordered hover className="text-center shadow-sm">
          <thead className="bg-dark text-white">
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {registersDetails.length > 0 ? (
              registersDetails.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                   <Link to="/chatbox" > <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleChat(user)} // Pass user object
                    >
                      Chat 💬
                    </Button></Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-muted">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Chat;
