import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github as CodeStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axiosInstance from "../lib/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import "prismjs/themes/prism.css";

function Log() {
  useEffect(() => {
    getStatus();
  }, []);

  const [configstatus, setConfigStatus] = useState(null);

  const getStatus = async () => {
    const response = await axiosInstance.get("/conf");
    setConfigStatus(response.data);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Port:</Form.Label>
        <Form.Control
          type="Number"
          min="3000"
          max="8000"
          placeholder="PORT"
          onChange={(e) => {
            setConfigStatus({
              ...configstatus,
              webserver: { ...configstatus.webserver, port: e.target.value },
            });
          }}
          value={configstatus ? configstatus.webserver.port : -1}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Log;
