import { Router } from 'express';
import userController from '../../controllers/user/user';
import jwt from '../../middlewares/jwt';

const router = new Router();

router.post('/', jwt.authenticate, userController.createNew);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', jwt.authenticate, userController.update);
router.delete('/:id', jwt.authenticate, userController.delete);

export default router;