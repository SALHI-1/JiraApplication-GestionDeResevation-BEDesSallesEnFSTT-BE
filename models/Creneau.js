
import mongoose from 'mongoose';

const creneauSchema = mongoose.Schema({
    heure_debut: {
        type: String, // Storing as String (e.g., "08:00") for simplicity, or could be Date
        required: true
    },
    heure_fin: {
        type: String,
        required: true
    },
    jour_semaine: {
        type: String,
        enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        required: true
    }
}, {
    timestamps: true
});

const Creneau = mongoose.model('Creneau', creneauSchema);

export default Creneau;
