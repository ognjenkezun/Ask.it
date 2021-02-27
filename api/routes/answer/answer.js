import { Router } from 'express';
import answerController from '../../controllers/answer/answer';
import jwt from '../../middlewares/jwt';

const router = new Router();

router.post('/', jwt.authenticate, answerController.createNew);
router.get('/:id', answerController.getById);
router.put('/:id', jwt.authenticate, answerController.update);
router.delete('/:id', jwt.authenticate, answerController.delete);
router.get('/to-question/:id', answerController.getAllToQuestionById);

export default router;