
import express from 'express';
import {
    authUser,
    registerUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/utilisateurController.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/')
    .post(registerUser)
    .get(getUsers);

router.post('/create', createUser);
router.route('/:id')
    .put(updateUser)
    .delete(deleteUser);

export default router;
