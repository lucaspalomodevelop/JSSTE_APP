import React, { useState, useEffect } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import statusConverter from "../../lib/statusConverter";
// import "./Dashboard.css";

function WebsrvStatus() {
  useEffect(() => {
    getStatus();
  }, []);

  const [websrvStatus, setwebsrvStatus] = useState([]);

  const getStatus = async () => {
    const response = await axiosInstance.get("/websrv/status");
    setwebsrvStatus(response.data);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Webserver Status</Card.Title>
        <Alert variant={statusConverter(websrvStatus).BootstrapClass}>
          Status: {websrvStatus.status}
          <br></br>
          {statusConverter(websrvStatus).msg}
        </Alert>
        <Alert variant={statusConverter(websrvStatus).BootstrapClass}>Port: {websrvStatus.port}</Alert>
      </Card.Body>
    </Card>
  );
}

export default WebsrvStatus;
