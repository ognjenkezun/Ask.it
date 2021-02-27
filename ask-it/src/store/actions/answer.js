import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getAnswer = (payload) => (dispatch, getState) => {
    axios.get(`http://localhost:3200/answer/${payload.id}`, {
    })
        .then((response) => dispatch(getAnswerSuccess(response)));
}

const getAnswerSuccess = (response) => {
    return {
        type: actionTypes.GET_ANSWERS_SUCCESS,
        answers: response.data
    }
}

export const addAnswer = (payload) => (dispatch, getState) => {
    axios.post(`http://localhost:3200/answer`, {
            content: payload.content,
            like: 20,
            dislike: 3,
            answerTo: payload.questionId
        }, { headers: {"jwt" : localStorage.getItem("accessToken") }}) 
    .then((response) => {
        dispatch(addAnswerSuccess(response));
    });
}

const addAnswerSuccess = (response) => {
    return {
        type: actionTypes.ADD_ANSWER_SUCCESS,
        answer: response.data
    }
}