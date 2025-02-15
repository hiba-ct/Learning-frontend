import React, { useEffect, useState } from "react";
import { Button, Card, Table, Form } from "react-bootstrap";
import { allSubmitAPI, deleteContactAPI } from "../../services/allApi";
import { Link } from "react-router-dom";

const ViewContacts = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [notedContacts, setNotedContacts] = useState(new Set());

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const result = await allSubmitAPI(reqHeader);
        if (result.status === 200) {
          setAllContacts(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteContacts = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        await deleteContactAPI(id, reqHeader);
        getAllContacts(); // Refresh the list
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Toggle selection of contacts
  const handleCheckboxChange = (id) => {
    setSelectedContacts((prev) => {
      const newSelected = new Set(prev);
      newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
      return newSelected;
    });
  };

  // Delete multiple selected contacts
  const deleteSelectedContacts = async () => {
    for (const id of selectedContacts) {
      await deleteContacts(id);
    }
    setSelectedContacts(new Set()); // Clear selection
  };

  // Toggle "Mark as Noted"
  const handleMarkNoted = (id) => {
    setNotedContacts((prev) => {
      const newNoted = new Set(prev);
      newNoted.has(id) ? newNoted.delete(id) : newNoted.add(id);
      return newNoted;
    });
  };

  return (
    <div className="container mt-4">
      <Card className="mb-4 shadow">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">📩 Contact Messages</h5>
          {selectedContacts.size > 0 && (
            <Button variant="danger" size="sm" className="float-end" onClick={deleteSelectedContacts}>
              Delete Selected
            </Button>
          )}
        </Card.Header>
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedContacts(new Set(allContacts.map((c) => c._id)));
                    } else {
                      setSelectedContacts(new Set());
                    }
                  }}
                  checked={selectedContacts.size === allContacts.length && allContacts.length > 0}
                />
              </th>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Course</th>
              <th>Message</th>
              <th>Mark as Noted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allContacts.length > 0 ? (
              allContacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedContacts.has(contact._id)}
                      onChange={() => handleCheckboxChange(contact._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{contact.fullname}</td>
                  <td>{contact.email}</td>
                  <td>{contact.contact}</td>
                  <td>{contact.course}</td>
                  <td>{contact.message}</td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={notedContacts.has(contact._id)}
                      onChange={() => handleMarkNoted(contact._id)}
                      label={notedContacts.has(contact._id) ? "✅ Noted" : "Mark"}
                    />
                  </td>
                  <td>
                    <Button onClick={() => deleteContacts(contact._id)} variant="danger" size="sm">
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Centered Chatbox Button */}
      <div className="d-flex justify-content-center">
        <Link to="/chatbox">
          <Button variant="success" className="px-5 py-2 btn-lg shadow">
            💬 Open Chatbox →
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ViewContacts;
