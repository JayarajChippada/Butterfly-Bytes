import express from 'express';
import { updateUser, deleteUser, signout, getUsers, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/sign-out', signout);
router.get('/getusers', verifyToken, getUsers); //This is for admin
router.get('/:userId', getUser);

export default router;