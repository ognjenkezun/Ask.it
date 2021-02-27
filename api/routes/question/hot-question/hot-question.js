import { Router } from 'express';
import questionController from '../../controllers/question/question';

const router = new Router();

router.get('/hot-questions', questionController.getWithTheMostLikes);

export default router;