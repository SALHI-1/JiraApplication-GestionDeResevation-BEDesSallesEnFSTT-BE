
import Reservation from '../models/Reservation.js';

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private
const getReservations = async (req, res) => {
    try {
        let query = {};
        // If not admin, only show own reservations
        if (req.headers.role !== 'Administrateur') {
            query = { id_utilisateur: req.headers._id };
        }

        const reservations = await Reservation.find(query)
            .populate('id_salle', 'nom_identifiant')
            .populate('id_utilisateur', 'nom email')
            .populate('id_creneau', 'heure_debut heure_fin jour_semaine');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a reservation
// @route   POST /api/reservations
// @access  Private
const createReservation = async (req, res) => {
    try {
        console.log(req.body.user);
        // 1. Role Check
        if (req.body.user.role !== 'Enseignant') {
            return res.status(403).json({ message: 'Seul les enseignants peuvent réserver des salles.' });
        }

        const { id_salle, id_creneau, date_reservation } = req.body;

        // 2. Conflict Detection
        const existingReservation = await Reservation.findOne({
            id_salle,
            id_creneau,
            date_reservation,
            statut: { $ne: 'Refusée' }
        });

        if (existingReservation) {
            return res.status(400).json({ message: 'C\'est déjà réservé à ce temps, essayez un autre calendrier.' });
        }

        const reservation = new Reservation({
            id_salle,
            id_utilisateur: req.body.user._id,
            id_creneau,
            date_reservation,
            statut: 'En attente'
        });

        const createdReservation = await reservation.save();
        res.status(201).json(createdReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update reservation status
// @route   PUT /api/reservations/:id
// @access  Private/Admin
// const updateReservationStatus = async (req, res) => {
//     try {
//         const reservation = await Reservation.findById(req.params.id);
//         if (reservation) {
//             // Check permissions
//             if (req.user.role === 'Administrateur') {
//                 // Admin can set any status (Validée/Refusée)
//                 reservation.statut = req.body.statut || reservation.statut;
//             } else if (req.user._id.equals(reservation.id_utilisateur)) {
//                 // Owner (Teacher) can only cancel
//                 if (req.body.statut === 'Annulée') {
//                     reservation.statut = 'Annulée';
//                 } else {
//                     return res.status(403).json({ message: 'Vous pouvez seulement annuler vos réservations.' });
//                 }
//             } else {
//                 return res.status(403).json({ message: 'Non autorisé' });
//             }

//             const updatedReservation = await reservation.save();
//             res.json(updatedReservation);
//         } else {
//             res.status(404).json({ message: 'Reservation not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
const updateReservationStatus = async (req, res) => {
    // On récupère tout depuis le body envoyé par le front
    const { statut, userId, role } = req.body; 
    const { id } = req.params;

    try {
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({ message: 'Réservation introuvable.' });
        }

        // --- VÉRIFICATION MANUELLE ---
        const isAdmin = role === 'Administrateur';
        const isOwner = userId === reservation.id_utilisateur.toString();

        if (isAdmin) {
            // L'admin peut tout changer
            reservation.statut = statut;
        } else if (isOwner) {
            // L'utilisateur peut seulement annuler sa propre réservation
            if (statut === 'Annulée') {
                reservation.statut = 'Annulée';
            } else {
                return res.status(403).json({ message: 'Action interdite : vous pouvez seulement annuler.' });
            }
        } else {
            return res.status(403).json({ message: 'Non autorisé' });
        }

        const updatedReservation = await reservation.save();
        res.json(updatedReservation);

    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour." });
    }
};
// @desc    Delete a reservation
// @route   DELETE /api/reservations/:id
// @access  Private
const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (reservation) {
            await reservation.deleteOne();
            res.json({ message: 'Reservation removed' });
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getReservations, createReservation, updateReservationStatus, deleteReservation };
