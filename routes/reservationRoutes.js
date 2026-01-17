
import express from 'express';
import {
    getReservations,
    createReservation,
    updateReservationStatus,
    deleteReservation
} from '../controllers/reservationController.js';

const router = express.Router();

router.route('/')
    .get(getReservations)
    .post(createReservation);

router.route('/:id')
    .put(updateReservationStatus)
    .delete(deleteReservation);

export default router;
