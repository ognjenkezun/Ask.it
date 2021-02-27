import * as actionTypes from '../actionTypes'
import { updateObject } from '../utility'

const initialState = {
    questions: [],
    question: {},
    questionsPage: 0
}

const getQuestions = (state, action) => {
    return updateObject(state, {
        questions: state.questions.concat(action.questions),
        questionsPage: action.questionsPage
    })
}

const getHotQuestions = (state, action) => {
    return updateObject(state, {
        questions: state.questions.concat(action.questions)
    })
}

const getQuestion = (state, action) => {
    return updateObject(state, {
        question: action.question
    })
}

const addQuestion = (state, action) => {
    return updateObject(state, {
        question: action.question
    })
}

const getMyQuestions = (state, action) => {
    return updateObject(state, {
        questions: action.questions
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_QUESTIONS_SUCCESS: return getQuestions(state, action);
        case actionTypes.GET_HOT_QUESTIONS_SUCCESS: return getHotQuestions(state, action);
        case actionTypes.GET_QUESTION_SUCCESS: return getQuestion(state, action);
        case actionTypes.ADD_QUESTION_SUCCESS: return addQuestion(state, action);
        case actionTypes.GET_MY_QUESTIONS_SUCCESS: return getMyQuestions(state, action);

        default: return state;
    }
}

export default reducer