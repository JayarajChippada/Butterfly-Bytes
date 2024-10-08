import express from 'express';
import { signup, signin, googleAuth } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.post('/google', googleAuth);

export default router