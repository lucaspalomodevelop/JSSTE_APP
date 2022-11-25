import { Stack, Card, Alert, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github as CodeStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axiosInstance from "../../lib/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import "prismjs/themes/prism.css";

function Log() {
  useEffect(() => {
    getStatus();
  }, []);

  const [Logstatus, setLogStatus] = useState(null);

  const getStatus = async () => {
    const response = await axiosInstance.get("/logs");
    setLogStatus(response.data);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Log</Card.Title>
        <Card.Text>
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
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Log;
