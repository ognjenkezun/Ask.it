import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user'
import questionsReducer from './reducers/question'
import answersReducer from './reducers/answer'

export default configureStore({
  reducer: {
    userReducer: userReducer,
    questionsReducer: questionsReducer,
    answersReducer: answersReducer
  }
});
