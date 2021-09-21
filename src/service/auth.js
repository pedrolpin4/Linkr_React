import API from './api';

async function register() {

}

async function login(body) {
    for(const key in body) {
        if(!validateCredentials(body[key])) {
            return {
                sucess: false,
                message: "Please, fill out the fields below with valid data."
            }
        }
    }
    console.log("entrei")
    const response = await API.post("/sign-in", body)
        .catch(e => {
            if(e.response.status === 403) return {
                sucess: false,
                message: "Invalid e-mail and/or password. Please, check the fields and try again."
            }
            return {
                sucess: false,
                message: "Something went wrong. Please, check the fields and try again."
            }
        })
    
    if(response.data) return {
        sucess: true,
        data: response.data
    }
    return response
}

function validateCredentials(data) {
    if(data.trim() === "") return false;
    return true;
}

const auth = {
    register,
    login
}

export default auth;