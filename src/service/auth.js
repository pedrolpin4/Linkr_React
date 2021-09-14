import axios from 'axios';

export const API = axios.create({
    baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr",
})

function getHashtagsPosts(hashtag, config) {
   return API.get(`/hashtags/${hashtag}/posts`, config)
}

export {
    getHashtagsPosts
}