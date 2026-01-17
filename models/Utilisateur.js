
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const utilisateurSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['Administrateur', 'Enseignant'],
        required: true,
        default: 'Enseignant'
    },
    mot_de_passe: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Match user entered password to hashed password in database
utilisateurSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.mot_de_passe);
};

// Encrypt password using bcrypt
utilisateurSchema.pre('save', async function (next) {
    if (!this.isModified('mot_de_passe')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

export default Utilisateur;
