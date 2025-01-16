import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Change to your backend URL
});

export default axiosInstance;
