import axios from "axios";
const REST_API_BASE_URL = 'http://localhost:8080';

export const registerDB = (registerReq) => {
    return axios.post(REST_API_BASE_URL + '/register', registerReq);
}

export const signinDB = (signinReq) => {
    return axios.post(REST_API_BASE_URL + '/sign-in', signinReq);
}