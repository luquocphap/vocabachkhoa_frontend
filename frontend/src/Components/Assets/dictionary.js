import axios from "axios";

export const http1 = axios.create({ baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/", timeout: 30000});