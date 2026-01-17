
import mongoose from 'mongoose';

const salleSchema = mongoose.Schema({
    nom_identifiant: {
        type: String,
        required: true,
        unique: true
    },
    capacite: {
        type: Number,
        required: true
    },
    localisation: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Amphithéâtre', 'Salle de TP', 'Salle de cours', 'Salle de conférence'],
        required: true
    },
    etat: {
        type: String,
        enum: ['Disponible', 'En panne', 'Maintenance'],
        default: 'Disponible',
        required: true
    }
}, {
    timestamps: true
});

const Salle = mongoose.model('Salle', salleSchema);

export default Salle;
