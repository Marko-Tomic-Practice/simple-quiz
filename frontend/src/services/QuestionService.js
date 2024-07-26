import axios from "axios";
const REST_API_BASE_URL = 'http://localhost:8080';

export const addQuestion = (QAPayload) => {
    return axios.post(REST_API_BASE_URL + '/add-questions', QAPayload);
}

export const getAllQuestionsDB = () => {
    return axios.get(REST_API_BASE_URL+'/edit-questions');
}

export const getQuestionByIdDB = (id) => {
    return axios.get(REST_API_BASE_URL+'/edit-questions/'+ id);
}

export const editQuestionDB = (id, QAPayload) => {
    return axios.put(REST_API_BASE_URL+'/edit-questions/'+ id, QAPayload);
}

export const removeQuestionDB = (id) => {
    return axios.delete(REST_API_BASE_URL+'/edit-questions/'+ id);
}