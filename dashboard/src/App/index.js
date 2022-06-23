import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link, BrowserRouter, Layout } from "react-router-dom";
import Routes from "./routes";
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "../Dashboard";
import Log from "../Log";
import Settings from "../Settings";

function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <Container id="Container" className="p-3 " fluid="md">
        <Navbar />
        <Row>
          <Col>
            <div className="App p-1">
              <Routes />
            </div>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
