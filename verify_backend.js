
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Salle from './models/Salle.js';
import Utilisateur from './models/Utilisateur.js';
import Creneau from './models/Creneau.js';
import Reservation from './models/Reservation.js';
import connectDB from './config/db.js';

dotenv.config();

const verifyBackend = async () => {
    try {
        await connectDB();

        console.log('--- Cleaning Database ---');
        await Reservation.deleteMany();
        await Creneau.deleteMany();
        await Salle.deleteMany();
        await Utilisateur.deleteMany();
        console.log('Database Cleaned');

        console.log('--- Creating Users ---');
        const admin = await Utilisateur.create({
            nom: 'Admin User',
            email: 'admin@example.com',
            mot_de_passe: '123456', // Will be hashed
            role: 'Administrateur'
        });
        console.log('Admin Created:', admin.nom);

        const teacher = await Utilisateur.create({
            nom: 'Teacher User',
            email: 'teacher@example.com',
            mot_de_passe: '123456',
            role: 'Enseignant'
        });
        console.log('Teacher Created:', teacher.nom);

        console.log('--- Creating Rooms (Salles) ---');
        const room1 = await Salle.create({
            nom_identifiant: 'A1',
            capacite: 50,
            localisation: 'Block A, 1st Floor',
            type: 'Salle de cours',
            etat: 'Disponible'
        });
        console.log('Room Created:', room1.nom_identifiant);

        console.log('--- Creating Time Slots (Creneaux) ---');
        const slot1 = await Creneau.create({
            heure_debut: '08:30',
            heure_fin: '10:30',
            jour_semaine: 'Lundi'
        });
        console.log('Slot Created:', slot1.jour_semaine, slot1.heure_debut);

        console.log('--- Creating Reservation ---');
        const reservation = await Reservation.create({
            id_salle: room1._id,
            id_utilisateur: teacher._id,
            id_creneau: slot1._id,
            date_reservation: new Date()
        });
        console.log('Reservation Created ID:', reservation._id);

        console.log('--- Verifying References ---');
        const populatedReservation = await Reservation.findById(reservation._id)
            .populate('id_salle')
            .populate('id_utilisateur')
            .populate('id_creneau');

        console.log('Reservation for Room:', populatedReservation.id_salle.nom_identifiant);
        console.log('Reservation by User:', populatedReservation.id_utilisateur.nom);
        console.log('Reservation Time:', populatedReservation.id_creneau.heure_debut);

        console.log('--- VERIFICATION SUCCESSFUL ---');
        process.exit();

    } catch (error) {
        console.error('Verification Failed:', error);
        process.exit(1);
    }
};

verifyBackend();
