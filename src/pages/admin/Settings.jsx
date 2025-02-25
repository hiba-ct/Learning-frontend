import React, { useEffect, useState } from "react";
import { Form, Button, Container, Card, Alert, Spinner } from "react-bootstrap";
import { adminDetailsPI, updateSettingsAPI } from "../../services/allApi";

const Settings = () => {
  const [adminData, setAdminData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const id = "67b18835c74604905d0583a7"; // Replace with dynamic ID from auth context

  // Fetch admin details on page load
  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setMessage({ text: "Authorization failed. Please log in again.", type: "danger" });
        return;
      }

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await adminDetailsPI(id, reqHeader);
        if (response.status === 200) {
          setAdminData({
            username: response.data.username,
            email: response.data.email,
            password: "", // Do not pre-fill password for security
          });
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
        setMessage({ text: "Failed to fetch admin details.", type: "danger" });
      }
    };

    fetchAdminDetails();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  // Reset form to original values
  const handleReset = () => {
    setAdminData({ username: "", email: "", password: "" });
    setMessage({ text: "", type: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      setMessage({ text: "Authorization failed. Please log in again.", type: "danger" });
      return;
    }

    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const result = await updateSettingsAPI(id, adminData, reqHeader);
      if (result.status === 200) {
        setMessage({ text: "Settings updated successfully!", type: "success" });
      } else {
        setMessage({ text: result.data?.message || "An error occurred.", type: "danger" });
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage({ text: "Failed to update the settings. Please try again.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow-sm" style={{ width: "450px" }}>
        <h3 className="text-center mb-4">Admin Settings</h3>

        {message.text && <Alert variant={message.type}>{message.text}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={adminData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password (Leave empty to keep current password)</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              disabled={loading}
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleReset} disabled={loading}>
              Reset
            </Button>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" /> : "Update Settings"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Settings;
