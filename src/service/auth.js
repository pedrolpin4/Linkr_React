import API from './api';

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
    return response;
}

async function register(body) {
    for(const key in body) {
        if(!validateCredentials(body[key])) {
            return {
                sucess: false,
                message: "Please, fill out the fields below."
            }
        }
    }

    const response = await API.post("sign-up", body)
        .catch(e => {
            if(e.response.status === 403) {
                return {
                    sucess: false,
                    message: "This e-mail has already been used to create an account. Please, log in or try to use another e-mail address."
                }
            }
            return {
                sucess: false,
                message: "Something went wrong. Please, check the fields and try again."
            }
        })
    
    if(response.data) return {
        sucess: true,
        data: response.data,
        message: "You account has been created! Now you only need to log in to start having fun! :D"
    }
    return response;
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