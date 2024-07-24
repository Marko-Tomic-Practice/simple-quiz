import axios from "axios";
const REST_API_BASE_URL = 'http://localhost:8080';

export const addQuestion = (QAPayload) => {
    return axios.post(REST_API_BASE_URL + '/add-questions', QAPayload);
}