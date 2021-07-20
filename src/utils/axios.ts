import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_GAINVEST_API });

export default API;
