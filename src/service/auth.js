import axios from 'axios';

export const API = axios.create({
    baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr",
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

async function getLikedPosts(token) {
    const response = await API.get("/posts/liked", head(token))
        .catch(() => false);

    if(response) return response.data;
    else return false;
}
/** 
 * @author Yohan Lopes
*/
async function getMyPosts(token, userId) {
    const response = await API.get(`/users/${userId}/posts`, head(token))
        .catch(() => false);

    if(response) return response.data;
    else return false;
}

function getHashtags (config) {
    return API.get("/hashtags/trending", config)
}

function getHashtagsPosts (config, hashtag){
    return API.get(`/hashtags/${hashtag}/posts`, config)
}

function postingLikes (config, id){
    return API.post(`/posts/${id}/like`, {}, config)
}

function deletingLikes (config, id){
    return API.post(`/posts/${id}/dislike`, {}, config)
}

function getUserPosts (config, userId){
    return API.get(`/users/${userId}/posts`, config)
}

function editingPost (config, id, value) {
    return API.put(`/posts/${id}`, {"text": value}, config)
}

const service =  {
    getHashtags,
    getHashtagsPosts,
    getPosts,
    postingLikes,
    deletingLikes,
    getUserPosts,
    getMyPosts,
    getLikedPosts,
    editingPost
}

export default service;