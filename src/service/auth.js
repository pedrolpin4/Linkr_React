import axios from 'axios';

export const API = axios.create({
    baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr",
})

function getHashtags (config) {
    return API.get("/hashtags/trending", config)
}

export{
    getHashtags
}