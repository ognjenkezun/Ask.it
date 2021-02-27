import { Router } from 'express';
import questionController from '../../controllers/question/question';

const router = new Router();

router.get('/the-most-answers', questionController.getWithTheMostAnswers);

export default router;