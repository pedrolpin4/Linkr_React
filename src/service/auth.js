import axios from 'axios';

export const API = axios.create({
    baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr",
})

function getHashtags (config) {
    return API.get("/hashtags/trending", config)
}

function getHashtagsPosts (config, hashtag){
    return API.get(`/hashtag/${hashtag}/posts`)
}

export{
    getHashtags,
    getHashtagsPosts
}