import React, { useContext, useEffect, useState } from 'react';
import { addServiceResponseContext, editServicesResponseContext } from '../../contexts/ContextApi';
import { Button, Card, Table, Alert } from 'react-bootstrap';
import { allServicesAPI, deleteServiceAPI } from '../../services/allApi';
import AddServices from './AddServices';
import EditServices from './EditServices';

const ViewServices = ({ tableServiceShow }) => {
  const { editServicesResponse } = useContext(editServicesResponseContext);
  const { addServiceResponse, setAddServiceResponse } = useContext(addServiceResponseContext);
  
  const [error, setError] = useState("");

  useEffect(() => {
    getAllServices();
  }, [editServicesResponse, addServiceResponse]);

  const getAllServices = async () => {
    setError("");

    try {
      const response = await allServicesAPI();
      if (response.status === 200) {
        setAddServiceResponse(response.data);
      } else {
        setError("Failed to load services.");
      }
    } catch (error) {
      setError("Error fetching services. Please try again.");
      console.error("Error fetching services:", error);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("Unauthorized access. Please log in.");
      return;
    }

    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      await deleteServiceAPI(id, reqHeader);
      getAllServices(); // Refresh services after deletion
    } catch (err) {
      setError("Error deleting service.");
      console.error("Error deleting service:", err);
    }
  };

  return (
    <Card className="mb-4 shadow-lg rounded">
      <Card.Header className="bg-primary text-white text-center fs-5 fw-bold">
        Manage Services
      </Card.Header>

      <Card.Body>
        {/* Add Services Form */}
        <div className="mb-4">
          <AddServices />
        </div>

        {/* Error Handling */}
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!tableServiceShow && (
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(addServiceResponse) && addServiceResponse.length > 0 ? (
                addServiceResponse.map((service, index) => (
                  <tr key={service?._id}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle fw-bold">{service.title}</td>
                    <td className="align-middle text-truncate" style={{ maxWidth: "250px" }}>
                      {service.text}
                    </td>
                    <td className="align-middle">
                      <Button variant="warning" size="sm" className="me-2 text-white">
                        <EditServices service={service} />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => deleteService(service?._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No services available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default ViewServices;
