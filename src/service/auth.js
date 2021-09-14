import axios from 'axios';

export const API = axios.create({
    baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr",
})


export async function getPosts() {
    const response = await API.get("/posts").catch(() => false);

    if(response) return response.data;
    else return false;
}