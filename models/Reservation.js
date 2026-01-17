
import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
    id_salle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Salle'
    },
    id_utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utilisateur'
    },
    id_creneau: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Creneau'
    },
    date_reservation: {
        type: Date,
        required: true
    },
    statut: {
        type: String,
        enum: ['En attente', 'Validée', 'Refusée','Annulée'],
        default: 'En attente'
    }
}, {
    timestamps: { createdAt: 'date_creation', updatedAt: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
