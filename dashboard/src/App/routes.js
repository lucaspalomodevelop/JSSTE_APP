import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Routes as RRoutes, Route, Link, BrowserRouter, Layout } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "../Dashboard";
import Log from "../Log";
import Settings from "../Settings";

function Routes() {
  return (
              <RRoutes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/log" element={<Log />} />
                <Route path="/settings" element={<Settings />} />
              </RRoutes>
  );
}

export default Routes;
