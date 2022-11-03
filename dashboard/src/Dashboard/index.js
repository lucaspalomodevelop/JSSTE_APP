import { Stack, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import JssteStatus from "./JssteStatus";
import WebsrvStatus from "./websrvStatus";
import AppStatus from "./appStatus";
import ConfigStatus from "./configStatus";
import LogStatus from "./logStatus";

function Dashboard() {
  return (
      <Stack gap={1}>
        <JssteStatus></JssteStatus>
        <WebsrvStatus></WebsrvStatus>
        <ConfigStatus></ConfigStatus>
        <LogStatus></LogStatus>
      </Stack>
  );
}

export default Dashboard;
