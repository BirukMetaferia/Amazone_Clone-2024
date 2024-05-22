import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-api-deploy-ud59.onrender.com/", // replace with your base URL
  
});
export{axiosInstance};
// Example usage of
