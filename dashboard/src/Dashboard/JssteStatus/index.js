import React, { useState, useEffect } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import statusConverter from "../../lib/statusConverter";
// import "./Dashboard.css";

function JssteStatus() {
  useEffect(() => {
    getStatus();
  }, []);

  const [JSSTEstatus, setJSSTEStatus] = useState([]);

  const getStatus = async () => {
    const response = await axiosInstance.get("/jsste/status");
    setJSSTEStatus(response.data);
  };

  

  return (
    <Card>
      <Card.Body>
        <Card.Title>JSSTE Status</Card.Title>
        <Alert variant={statusConverter(JSSTEstatus).BootstrapClass}>
          Status: {JSSTEstatus.status}
          <br></br>
          {statusConverter(JSSTEstatus).msg}
        </Alert>
        <Alert variant={statusConverter(JSSTEstatus).BootstrapClass}>
          Message: {JSSTEstatus.statusMSG}
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default JssteStatus;
