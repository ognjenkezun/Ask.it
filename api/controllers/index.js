import userRoutes from '../routes/user/user';
import questionRoutes from '../routes/question/question';
import answerRoutes from '../routes/answer/answer';
// import answerController from './answer/answer';
// import authController from './auth/auth';
import jwt from '../middlewares/jwt';

const { Router } = require('express');
const router = new Router();

const controllers = {};

//Defining function for initializing user controller
controllers.initUserController = (app) => {
    router.use("/user", jwt.authenticate, userRoutes);
    app.use(router);
}

//Defining function for initializing question controller
controllers.initQuestionController = (app) => {
    router.use("/question", questionRoutes);
    app.use(router);
}

//Defining function for initializing answer controller
controllers.initAnswerController = (app) => {
    router.use("/answer", answerRoutes);
    app.use(router);
}

//Defining function for initializing auth controller
// controllers.initAuthController = (app) => {
//     router.use('/auth', authController);
//     app.use(router);
// }

export default controllers;