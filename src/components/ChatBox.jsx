import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { allMessagesAPI, sendmessageAPI, usermessageAPI, adminreplyAPI, deleteMessageAPI } from "../services/allApi";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(null); 
  const [username, setUsername] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("existingUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setRole(parsedUser.role);
      setUserId(parsedUser._id);
      setUsername(parsedUser.username);
    }
  }, []);

  useEffect(() => {
    if (role && userId !== null) {
      fetchAllMessages();
    }
  }, [role, userId]);

  useLayoutEffect(() => {
    scrollToBottom();
  }, []);

  const fetchAllMessages = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = role === "admin" ? await allMessagesAPI(headers) : await usermessageAPI(headers, { userId });
      if (response.status === 200) {
        setMessages(Array.isArray(response.data) ? response.data : []);
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    const token = sessionStorage.getItem("token");
    if (!token) return;
  
    if (role === "admin") {
      if (!selectedMessageId) {
        console.error("No message selected to reply to!");
        return;
      }
  
      console.log("Sending Reply to Message ID:", selectedMessageId); // Debugging
  
      try {
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
        const response = await adminreplyAPI(selectedMessageId, { reply: messageInput }, headers);
        if (response.status === 201) {
          setMessageInput("");
          setSelectedMessageId(null); // ✅ Reset selected message
          fetchAllMessages(); // Refresh messages
        }
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    } else {
      // Student sending message
      const reqBody = { message: messageInput, sender: "student", userId };
      try {
        setMessageInput("");
        const result = await sendmessageAPI(reqBody, { Authorization: `Bearer ${token}`, "Content-Type": "application/json" });
        if (result.status === 201) fetchAllMessages();
      } catch (err) {
        console.error("API Error:", err);
      }
    }
  };
  

  

  const deleteMessage = async (messageId, isReply = false) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
  
    const reqHeader = { Authorization: `Bearer ${token}` };
  
    try {
      // If deleting a reply, send a request specifically for deleting replies
      if (isReply) {
        await deleteMessageAPI(messageId, reqHeader, { isReply: true });
      } else {
        await deleteMessageAPI(messageId, reqHeader);
      }
      
      fetchAllMessages();
    } catch (err) {
      console.log(err);
    }
  };
  

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container className="d-flex flex-column border rounded shadow-lg bg-light p-3 mt-5" style={{ maxWidth: "450px", height: "550px" }}>
      <Card className="mb-2">
        <Card.Header className="bg-danger text-white text-center fs-5 fw-bold">
          Chat 💬 <FontAwesomeIcon icon={faRocketchat} />
        </Card.Header>
      </Card>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: "10px" }}>
      {role === "admin" ? (
  messages.map((user) => (
    <div key={user.userId} className="mb-4">
      <h5 className="fw-bold">{user.username} ({user.email})</h5>
      {user.messages?.map((message, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          {/* Student Message (Clickable for Reply) */}
          <div 
            className={`d-flex justify-content-end position-relative ${selectedMessageId === message._id ? "border border-warning" : ""}`} 
            onClick={() => setSelectedMessageId(message._id)} // ✅ Correctly set selected message ID
            style={{ cursor: "pointer", padding: "5px", borderRadius: "10px" }}
          >
            <Card 
              className="p-3 text-white shadow-sm bg-primary" 
              style={{ borderRadius: "15px", maxWidth: "75%" }}
            >
              <Card.Body>
                <strong>{user.username}:</strong> {message.message}
              </Card.Body>
            </Card>

            {/* Delete Button for Admin */}
            <Button 
              variant="danger" 
              size="sm"
              className="position-absolute top-0 end-0 me-2 mt-2 rounded-circle"
              style={{ width: "30px", height: "30px", fontSize: "14px" }}
              onClick={() => deleteMessage(message._id)}
            >
              ❌
            </Button>
          </div>

          {/* Show Admin Reply */}
          {message.reply && (
            <div className="d-flex justify-content-start mt-2 position-relative">
              <Card className="p-2 text-white shadow-sm bg-secondary" style={{ borderRadius: "10px", maxWidth: "65%" }}>
                <Card.Body>
                  <strong>Admin:</strong> {message.reply}
                </Card.Body>
              </Card>

             
            </div>
          )}
        </div>
      ))}
    </div>
  ))
) : (
  messages.map((msg, index) => (
    <div key={index} style={{ marginBottom: "8px" }}>
      {/* User & Admin Messages */}
      <div className={`d-flex ${msg.sender === "admin" ? "justify-content-start" : "justify-content-end"} position-relative`}>
        <Card 
          className={`p-3 text-white shadow-sm ${msg.sender === "admin" ? "bg-dark" : "bg-primary"}`} 
          style={{ borderRadius: "15px", maxWidth: "75%" }}
        >
          <Card.Body>
            <strong>{msg.sender === "admin" ? "Admin" : username}:</strong> {msg.message}
          </Card.Body>
        </Card>

       
      </div>

      {/* Admin Reply */}
      {msg.reply && (
        <div className="d-flex justify-content-start mt-2">
          <Card className="p-2 text-white shadow-sm bg-secondary" style={{ borderRadius: "10px", maxWidth: "65%" }}>
            <Card.Body>
              <strong>Admin:</strong> {msg.reply}
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  ))
)}



        <div ref={messagesEndRef}></div>
      </div>

      {role && (
       <Form className="d-flex align-items-center bg-light p-2 border-top">
       <Form.Control 
         type="text" 
         placeholder={role === "admin" && !selectedMessageId ? "Select a message to reply..." : "Type your message..."} 
         value={messageInput} 
         onChange={(e) => setMessageInput(e.target.value)} 
         disabled={role === "admin" && !selectedMessageId} // ✅ Disable input if no message is selected
       />
       <Button 
         variant="success" 
         className="ms-2" 
         onClick={handleSendMessage} 
         disabled={role === "admin" && !selectedMessageId} // ✅ Prevent sending reply without selecting a message
       >
         {role === "admin" ? "Reply" : "Send"}
       </Button>
     </Form>
     
      )}
    </Container>
  );
};

export default ChatBox;
