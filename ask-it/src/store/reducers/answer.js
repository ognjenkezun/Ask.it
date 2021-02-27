import * as actionTypes from '../actionTypes'
import { updateObject } from '../utility'

const initialState = {
    answers: [],
    answer: {}
}

const addAnswer = (state, action) => {
    return updateObject(state, {
        answer: action.answer
    })
}

const getAnswers = (state, action) => {
    return updateObject(state, {
        answers: state.answers.concat(action.answers),
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ANSWER_SUCCESS: return addAnswer(state, action);
        case actionTypes.GET_ANSWERS_SUCCESS: return getAnswers(state, action);

        default: return state;
    }
}

export default reducer