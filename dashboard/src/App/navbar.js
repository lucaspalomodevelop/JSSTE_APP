import { Container, Navbar as BNavbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function Navbar() {
  return (
    <BNavbar className="mb-4" bg="light" variant="light">
      <Container>
        <BNavbar.Brand as={Link} to="/">
          JSSTE-Dashboard
        </BNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/log">
            Log
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/settings">
            Settings
          </Nav.Link> */}
        </Nav>
      </Container>
    </BNavbar>
  );
}

export default Navbar;
