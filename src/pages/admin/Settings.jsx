import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Alert } from "react-bootstrap";
import { updateSettingsAPI } from "../../services/allApi";

const Settings = ({ admin }) => {
  const [settings, setSettings] = useState({
    id: admin._id,
    username: admin.username,
    email: admin.email,
    password: "",
    role: admin.role,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { id, username, email, password, role } = settings;

    if (!username || !email || !role) {
      setError("Username, Email, and Role are required!");
      return;
    }

    const reqBody = { username, email, password: password || admin.password, role };

    try {
      const token = sessionStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await updateSettingsAPI(id, reqBody, headers);

      if (response.status === 200) {
        setSuccess("Settings updated successfully!");
      } else {
        setError("Failed to update settings.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Error updating settings.");
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card className="mb-4 shadow-lg mt-5">
          <Card.Header className="bg-primary text-white text-center fw-bold ">
            Admin Settings
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form onSubmit={handleUpdateSettings}>
              <Form.Group className="mb-3">
                <Form.Label>Admin Username</Form.Label>
                <Form.Control
                  type="text"
                  value={settings.username}
                  onChange={(e) => setSettings({ ...settings, username: e.target.value })}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="admin@eduversity.com"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password (Leave blank to keep current)</Form.Label>
                <Form.Control
                  type="password"
                  value={settings.password}
                  onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                  placeholder="Enter new password"
                />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100">
                Update Settings
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Settings;
