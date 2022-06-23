function StatusConverter(status) {
  console.log("StatusConverter: status: ", status);
  var result = {};
  result.msg = "";
  result.BootstrapClass = "";
  if (status.status === 0) {
    result.msg = "OK";
    result.BootstrapClass = "success";
  } else if (status.status === 1) {
    result.msg = "ERROR :: " + status.statusMSG;
    result.BootstrapClass = "danger";
  } else if (status.status === 2) {
    result.msg = "WARNING :: " + status.statusMSG;
    result.BootstrapClass = "warning";
  } else if (status.status === 3) {
    result.msg = "INFO :: " + status.statusMSG;
    result.BootstrapClass = "info";
  } else if (status.status === 4) {
    result.msg = "DEBUG :: " + status.statusMSG;
    result.BootstrapClass = "secondary";
  } else {
    result.msg = "UNKNOWN -> " + status.status;
    result.BootstrapClass = "secondary";
  }
  return result;
}

export default StatusConverter;
