import React, { useState, useEffect } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { Card, Accordion, Spinner } from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github as CodeStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "bootstrap/dist/css/bootstrap.min.css";
import "prismjs/themes/prism.css";
// import "./Dashboard.css";

function LogStatus() {
  useEffect(() => {
    getStatus();
  }, []);

  const [Logstatus, setLogStatus] = useState(null);

  const getStatus = async () => {
    const response = await axiosInstance.get("/logs/length/" + 32);
    setLogStatus(response.data);
  };

  return (
    // <Card>
    //   <Card.Body>
    //     <Card.Title>Log</Card.Title>
    //     <Card.Text>
    //       <SyntaxHighlighter language="log" style={CodeStyle}>
    //         {String(Logstatus)}
    //       </SyntaxHighlighter>
    //     </Card.Text>
    //   </Card.Body>
    // </Card>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Log</Accordion.Header>
        <Accordion.Body>
          {Logstatus ? (
            <SyntaxHighlighter language="log" style={CodeStyle}>
              {String(Logstatus)}
            </SyntaxHighlighter>
          ) : (
            <Spinner
              className="center col-md-5 mx-auto"
              animation="border"
              variant="dark"
            />
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default LogStatus;
