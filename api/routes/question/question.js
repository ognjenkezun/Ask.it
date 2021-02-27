import { Router } from 'express';
import questionController from '../../controllers/question/question';
import jwt from '../../middlewares/jwt';

const router = new Router();

router.get('/', questionController.getAll);
router.post('/', jwt.authenticate, questionController.createNew);
router.get('/hot-questions', questionController.getWithTheMostLikes);
router.get('/the-most-answers', questionController.getWithTheMostAnswers);
router.get('/my-questions', jwt.authenticate, questionController.getAllForLoggedUser);
router.get('/:id', questionController.getById);
router.put('/:id', jwt.authenticate, questionController.update);
router.delete('/:id', jwt.authenticate, questionController.delete);

export default router;

