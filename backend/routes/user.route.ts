import express from 'express'
import { registerController } from '../controllers/register.controller.ts';
import { loginController } from '../controllers/login.controller.ts';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

export default router;