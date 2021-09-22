import axios from 'axios';

const API = axios.create({
    baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr",
})

export default API;