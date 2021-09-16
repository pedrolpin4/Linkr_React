import axios from 'axios';

export const API = axios.create({
    baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr",
})

function head(token) {
    const head = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return head;
}

async function getPosts(token) {
    const response = await API.get("/posts", head(token)).catch(() => false);

    if(response) return response.data;
    else return false;
}

function getHashtags (config) {
    return API.get("/hashtags/trending", config)
}

function getHashtagsPosts (config, hashtag){
    return API.get(`/hashtags/${hashtag}/posts`, config)
}

const service =  {
    getHashtags,
    getHashtagsPosts,
    getPosts
}

export default service;