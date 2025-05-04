import axios from "axios";

export const http = axios.create({baseURL: "http://localhost:3069", timeout: 30000});
