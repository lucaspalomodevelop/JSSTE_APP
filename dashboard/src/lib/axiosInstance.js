import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_APIURL,
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

// const axiosInstance = function () {
//   // let conf = await axios.get("/api/conf");
//   // return [];
//   // if (conf.statuscode === 200) {
//   //   return axios.create({
//   //     baseURL: window.location.origin,
//   //   });
//   // }
// };

export default instance;
