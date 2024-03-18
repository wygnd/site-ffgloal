import axios from "axios/index";

const $api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true
})