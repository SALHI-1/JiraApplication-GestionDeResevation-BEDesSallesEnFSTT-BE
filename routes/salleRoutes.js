
import express from 'express';
import {
    getSalles,
    getSalleById,
    createSalle,
    updateSalle,
    deleteSalle
} from '../controllers/salleController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getSalles)
    .post(createSalle);

router.route('/:id')
    .get(getSalleById)
    .put(updateSalle)
    .delete(deleteSalle);

export default router;
