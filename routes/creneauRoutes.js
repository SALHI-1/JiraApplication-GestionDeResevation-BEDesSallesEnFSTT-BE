
import express from 'express';
import {
    getCreneaux,
    createCreneau,
    deleteCreneau
} from '../controllers/creneauController.js';

const router = express.Router();

router.route('/')
    .get(getCreneaux)
    .post(createCreneau);

router.route('/:id')
    .delete(deleteCreneau);

export default router;
