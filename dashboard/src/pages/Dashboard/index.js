import { Stack, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import JssteStatus from "../../components/JssteStatus";
import WebsrvStatus from "../../components/websrvStatus";
import AppStatus from "../../components/appStatus";
import ConfigStatus from "../../components/configStatus";
import LogStatus from "../../components/logStatus";

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
