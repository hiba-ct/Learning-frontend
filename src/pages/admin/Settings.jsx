import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { updateSettingsAPI } from '../../services/allApi';

const Settings = ({ admin }) => {
    const [message, setMessage] = useState({
        id: admin._id,
        username: admin.username,
        email: admin.email,
        password: admin.password,
        role: admin.role,
    });

    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        const { id, username, email, password, role } = message;

        if (username && email && password && role) {
            const reqBody = { username, email, password, role };

            try {
                const token = sessionStorage.getItem("token");
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };

                const response = await updateSettingsAPI(id, reqBody, headers);

                if (response.status === 200) {
                    alert("Settings updated successfully!");
                    console.log("Response data:", response.data);
                } else {
                    alert("Failed to update settings.");
                    console.error("Response error:", response);
                }
            } catch (error) {
                console.error("Error occurred:", error);
                alert("Error updating settings.");
            }
        } else {
            alert("All fields are required.");
        }
    };

    return (
        <>
            <Row>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header>Settings</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleUpdateSettings}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Admin Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={message.username}
                                        onChange={(e) =>
                                            setMessage({ ...message, username: e.target.value })
                                        }
                                        placeholder="Enter username"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Admin Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={message.email}
                                        onChange={(e) =>
                                            setMessage({ ...message, email: e.target.value })
                                        }
                                        placeholder="admin@eduversity.com"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={message.password}
                                        onChange={(e) =>
                                            setMessage({ ...message, password: e.target.value })
                                        }
                                        placeholder="Enter new password"
                                    />
                                </Form.Group>
                                <Button variant="danger" type="submit">
                                    Update Settings
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Settings;
