import React, { useState, useEffect } from "react";

import axiosInstance from "../../lib/axiosInstance";

import { Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Dashboard.css";

function AppStatus() {
  useEffect(() => {
    getStatus();
  }, []);

  const [appStatus, setappStatus] = useState([]);

  const getStatus = async () => {
    const response = await axiosInstance.get("/app/status");
    setappStatus(response.data);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>App Status</Card.Title>
          <Alert>Memory usage: {appStatus.memusage} MB</Alert>
          <Alert>Processor usage: {appStatus.procusage} %</Alert>
      </Card.Body>
    </Card>
  );
}

export default AppStatus;
