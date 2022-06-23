import React, { useState, useEffect } from "react";
import axiosInstance from "../../lib/axiosInstance";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github as CodeStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Card, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "prismjs/themes/prism.css";
// import "./Dashboard.css";

function ConfigStatus() {
  useEffect(() => {
    getStatus();
  }, []);

  const [configStatus, setconfigStatus] = useState({});

  const getStatus = async () => {
    const response = await axiosInstance.get("/conf");
    setconfigStatus(response.data);
  };

  return (
    // <Card>
    //   <Card.Body>
    //     <Card.Title>Current Config</Card.Title>
    //     <Card.Text>
    //       <SyntaxHighlighter language="json" style={CodeStyle}>
    //         {JSON.stringify(configStatus, null, 2)}
    //       </SyntaxHighlighter>
    //     </Card.Text>
    //   </Card.Body>
    // </Card>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Config ({configStatus.meta ? configStatus.meta.confloadtype : "?"})
        </Accordion.Header>
        <Accordion.Body>
          <SyntaxHighlighter language="log" style={CodeStyle}>
            {JSON.stringify(configStatus, null, 2)}
          </SyntaxHighlighter>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ConfigStatus;
