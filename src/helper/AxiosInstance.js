import axios from "axios";

let axiosInstance = axios.create({
    baseURL:"http://13.232.201.232:1122/"
})

export default axiosInstance;