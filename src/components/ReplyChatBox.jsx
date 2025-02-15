import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { adminreplyAPI } from "../services/allApi";

const ReplyChatBox = ({ chat, fetchMessages }) => {
  const [showModal, setShowModal] = useState(false);
  const [replyInput, setReplyInput] = useState(chat.reply || "");
  const [role, setRole] = useState("");

  useEffect(() => {
    const userData = sessionStorage.getItem("existingUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setRole(JSON.parse(userData).role);
    }
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setReplyInput(chat.reply || ""); // Reset input when closing modal
  };

  const handleReply = async () => {
    const token = sessionStorage.getItem("token");

    if (!token || role !== "admin") {
      alert("Only admin can send replies.");
      return;
    }

    if (!replyInput.trim()) {
      alert("Reply cannot be empty.");
      return;
    }

    try {
      const reqBody = { reply: replyInput,role }; // Ensure only reply is updated
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await adminreplyAPI(chat._id, reqBody, reqHeader);

      if (result.status === 200) {
        alert("Reply sent successfully!");
        handleClose();
        fetchMessages(); // Fetch updated messages after replying
      } else {
        alert(result.response?.data || "Error sending reply.");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Server error. Please try again later.");
    }
};

  return (
    <>
      <Button variant="warning" className="mt-2 ms-3" onClick={handleShow}>
        Reply
      </Button>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Student:</strong> {chat.message}
          </p>
          <Form.Group controlId="adminReply">
            <Form.Control
              type="text"
              placeholder="Type your reply..."
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleReply}>
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReplyChatBox;
