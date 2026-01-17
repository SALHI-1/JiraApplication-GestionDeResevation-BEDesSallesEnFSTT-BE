
import Creneau from '../models/Creneau.js';

// @desc    Get all creneaux
// @route   GET /api/creneaux
// @access  Public
const getCreneaux = async (req, res) => {
    try {
        const creneaux = await Creneau.find({});
        res.json(creneaux);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a creneau
// @route   POST /api/creneaux
// @access  Private/Admin
const createCreneau = async (req, res) => {
    try {
        const { heure_debut, heure_fin, jour_semaine } = req.body;
        const creneau = new Creneau({ heure_debut, heure_fin, jour_semaine });
        const createdCreneau = await creneau.save();
        res.status(201).json(createdCreneau);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a creneau
// @route   DELETE /api/creneaux/:id
// @access  Private/Admin
const deleteCreneau = async (req, res) => {
    try {
        const creneau = await Creneau.findById(req.params.id);
        if (creneau) {
            await creneau.deleteOne();
            res.json({ message: 'Creneau removed' });
        } else {
            res.status(404).json({ message: 'Creneau not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getCreneaux, createCreneau, deleteCreneau };
