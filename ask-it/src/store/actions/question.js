import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getQuestions = (payload) => (dispatch, getState) => {
    axios({
        method: 'get',
        url: 'http://localhost:3200/question',
        headers: {"jwt" : localStorage.getItem("accessToken")}, 
        params: {page: payload?.page ?? 1}
        }).then((response) => {
            console.log("==>>>>>>", response);
            dispatch(getQuestionsSuccess(response))});
}

const getQuestionsSuccess = (response) => {
    return {
        type: actionTypes.GET_QUESTIONS_SUCCESS,
        questions: response?.data?.data ?? [],
        questionsPage: response?.config?.params?.page ?? 1
    }
}

export const getHotQuestions = (payload) => (dispatch, getState) => {
    axios({
        method: 'get',
        url: 'http://localhost:3200/question/hot-questions',
        }).then((response) => dispatch(getHotQuestionsSuccess(response)));
}

const getHotQuestionsSuccess = (response) => {
    return {
        type: actionTypes.GET_HOT_QUESTIONS_SUCCESS,
        questions: response.data
    }
}

export const getQuestion = (payload) => (dispatch, getState) => {
    axios.get(`http://localhost:3200/question/${payload.id}`, {
        headers: {"jwt" : localStorage.getItem("accessToken")}, 
    })
        .then((response) => dispatch(getQuestionSuccess(response)));
}

const getQuestionSuccess = (response) => {
    return {
        type: actionTypes.GET_QUESTION_SUCCESS,
        question: response.data.data
    }
}

export const addQuestion = (payload) => (dispatch, getState) => {
    const token = localStorage.getItem("accessToken");
    axios.post(`http://localhost:3200/question`, {content: payload.content,
        like: 450,
        dislike: 20,
        userId: 3}, 
        { headers: {"jwt" : token}
    })
        .then((response) => dispatch(addQuestionSuccess(response)));
}

const addQuestionSuccess = (response) => {
    return {
        type: actionTypes.ADD_QUESTION_SUCCESS,
        question: response.data
    }
}

export const getMyQuestions = (payload) => (dispatch, getState) => {
    axios.get(`http://localhost:3200/question/my-questions`, {
        headers: {"jwt" : localStorage.getItem("accessToken")}
    })
        .then((response) => dispatch(getMyQuestionsSuccess(response)));
}

const getMyQuestionsSuccess = (response) => {
    return {
        type: actionTypes.GET_MY_QUESTIONS_SUCCESS,
        questions: response.data
    }
}