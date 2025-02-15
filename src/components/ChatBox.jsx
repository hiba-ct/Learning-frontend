import React, { useEffect, useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import {  allMessagesAPI, deleteMessageAPI, usermessageAPI } from "../services/allApi";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReplyChatBox from "./ReplyChatBox";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const [role, setRole] = useState("");

 
 
  useEffect(() => {
    const userData = sessionStorage.getItem("existingUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setRole(parsedUser.role);
    }
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await allMessagesAPI(headers);
      if (response.status === 200) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) {
      alert("Please enter a message!");
      return;
    }
  
    try {
      const userData = sessionStorage.getItem("existingUser");
      const sender = userData ? JSON.parse(userData).role : "student"; // Default to student
  
      const messageData = { message: messageInput, sender }; // ✅ Include sender role
  
      const response = await usermessageAPI(messageData);
      if (response.status === 201) {
        alert("Message sent successfully!");
        setMessageInput("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Server error. Please try again later.");
    }
  };
  
 const deleteMessage = async (messageId) => {
     const token = sessionStorage.getItem("token");
     if (token) {
       const reqHeader = {
         Authorization: `Bearer ${token}`,
       };
       try {
         await deleteMessageAPI(messageId, reqHeader);
        fetchMessages(); // Refresh the list
       } catch (err) {
         console.log(err);
       }
     }
   };
   
  return (
    <Container className="d-flex flex-column border rounded shadow-lg bg-light p-3 mt-5" style={{ maxWidth: "450px", height: "550px", overflowY: "auto" }}>
      {/* Header */}
      <Card className="mb-2">
        <Card.Header className="bg-danger text-white text-center fs-5 fw-bold">
          Chatbox<FontAwesomeIcon icon={faRocketchat} />
        </Card.Header>
      </Card>

      {/* Messages Section */}
      {messages.length > 0 ? (
  messages.map((msg) => (
    <div key={msg._id} className="d-flex flex-column align-items-start mb-3 position-relative">
      {/* Message */}
      <Card
        className={`p-2 shadow-sm ${msg.sender === "student" ? "bg-primary text-white" : "bg-secondary text-white"}`}
        style={{
          borderRadius: "15px",
          maxWidth: "80%",
          alignSelf: msg.sender === "student" ? "flex-end" : "flex-start",
        }}
      >
        <Card.Body className="position-relative">
          <strong>{msg.sender === "student" ? "Student" : "Admin"}:</strong> {msg.message}
        </Card.Body>
      </Card>

      {/* Delete Button (Only for Admins & Message Owners) */}
      {(role === "admin" || (role === "student" && msg.sender === "student")) && (
        <Button
          variant="danger"
          size="sm"
          className="position-absolute top-0 end-0 me-2 mt-2"
          style={{ borderRadius: "50%", width: "25px", height: "25px", fontSize: "14px" }}
          onClick={() => deleteMessage(msg._id)}
        >
          ❌
        </Button>
      )}

      {/* Admin Reply (if exists) */}
      {msg.reply && (
        <Card className="p-2 ms-3 mt-1 bg-warning text-dark shadow-sm" style={{ borderRadius: "15px", maxWidth: "75%", alignSelf: "flex-start" }}>
          <Card.Body>
            <strong>Admin:</strong> {msg.reply}
          </Card.Body>
        </Card>
      )}

      {/* Admin Reply Button */}
      {role === "admin" && !msg.reply && msg.sender === "student" && (
        <ReplyChatBox chat={msg} fetchMessages={fetchMessages} />
      )}
    </div>
  ))
) : (
  <p className="text-muted text-center">No messages yet.</p>
)}

    {/* Message Input for Students and Admins */}
{(role === "student" || role === "admin") && (
  <Form className="d-flex align-items-center bg-light p-2 border-top">
    <Form.Control
      type="text"
      placeholder="Type your message..."
      value={messageInput}
      onChange={(e) => setMessageInput(e.target.value)}
    />
    <Button variant="success" className="ms-2" onClick={handleSendMessage}>
      Send
    </Button>
  </Form>
)}


    </Container>
  );
};

export default ChatBox;
