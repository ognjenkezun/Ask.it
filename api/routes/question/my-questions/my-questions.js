import { Router } from 'express';
import questionController from '../../controllers/question/question';
import jwt from '../../helpers/jwt';

const router = new Router();

router.get('/my-questions', jwt.authenticate, questionController.getAllForLoggedUser);

export default router;