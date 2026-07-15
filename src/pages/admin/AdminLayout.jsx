import React, { useContext } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBook,
  faCog,
  faSignOutAlt,
  faChalkboardUser,
  faGraduationCap,

} from "@fortawesome/free-solid-svg-icons";
import { faServicestack } from "@fortawesome/free-brands-svg-icons";
import { tokenAuthContext } from "../../contexts/AuthContextApi";
import { faDashboard } from "@fortawesome/free-solid-svg-icons/faDashboard";

const AdminLayout = () => {
  const { setIsAutherised } = useContext(tokenAuthContext);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    setIsAutherised(false);
    navigate("/");
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0">

        {/* Sidebar */}
        <Col md={2} className="bg-dark sidebar vh-100 p-3">
          <h2 className="text-white text-center mb-4">Eduversity Admin</h2>

          <Nav className="flex-column">

            <Nav.Link as={Link} to="/admin-dashboard" className="text-white">
            <FontAwesomeIcon icon={faDashboard} className="me-2" />
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/viewcourse" className="text-white">
              <FontAwesomeIcon icon={faBook} className="me-2" />
              Manage Courses
            </Nav.Link>

            <Nav.Link as={Link} to="/viewservices" className="text-white">
              <FontAwesomeIcon icon={faServicestack} className="me-2" />
              Manage Services
            </Nav.Link>

            <Nav.Link as={Link} to="/viewstudents" className="text-white">
              <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
              Manage Students
            </Nav.Link>

            <Nav.Link as={Link} to="/viewteachers" className="text-white">
              <FontAwesomeIcon icon={faChalkboardUser} className="me-2" />
              Manage Teachers
            </Nav.Link>

            <Nav.Link as={Link} to="/viewsettings" className="text-white">
              <FontAwesomeIcon icon={faCog} className="me-2" />
              Settings
            </Nav.Link>

            <Nav.Link as={Link} to="/viewcontact" className="text-white">
            <FontAwesomeIcon icon={faUser} className="me-2" />
              Register Students
            </Nav.Link>

            <Nav.Link as={Link} to="/viewchat" className="text-white">
            <FontAwesomeIcon icon={faUser} className="me-2" />
              Users
            </Nav.Link>

            <Nav.Link onClick={logout} className="text-white">
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </Nav.Link>

          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <Outlet />
        </Col>

      </Row>
    </Container>
  );
};

export default AdminLayout;