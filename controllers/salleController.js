
import Salle from '../models/Salle.js';

// @desc    Get all salles
// @route   GET /api/salles
// @access  Public
const getSalles = async (req, res) => {
    try {
        const salles = await Salle.find({});
        res.json(salles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get salle by ID
// @route   GET /api/salles/:id
// @access  Public
const getSalleById = async (req, res) => {
    try {
        const salle = await Salle.findById(req.params.id);
        if (salle) {
            res.json(salle);
        } else {
            res.status(404).json({ message: 'Salle not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a salle
// @route   POST /api/salles
// @access  Private/Admin (To be implemented)
const createSalle = async (req, res) => {
    try {
        const { nom_identifiant, capacite, localisation, type, etat } = req.body;
        const salle = new Salle({ nom_identifiant, capacite, localisation, type, etat });
        const createdSalle = await salle.save();
        res.status(201).json(createdSalle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a salle
// @route   PUT /api/salles/:id
// @access  Private/Admin
const updateSalle = async (req, res) => {
    try {
        const salle = await Salle.findById(req.params.id);
        if (salle) {
            salle.nom_identifiant = req.body.nom_identifiant || salle.nom_identifiant;
            salle.capacite = req.body.capacite || salle.capacite;
            salle.localisation = req.body.localisation || salle.localisation;
            salle.type = req.body.type || salle.type;
            salle.etat = req.body.etat || salle.etat;

            const updatedSalle = await salle.save();
            res.json(updatedSalle);
        } else {
            res.status(404).json({ message: 'Salle not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a salle
// @route   DELETE /api/salles/:id
// @access  Private/Admin
const deleteSalle = async (req, res) => {
    try {
        const salle = await Salle.findById(req.params.id);
        if (salle) {
            await salle.deleteOne();
            res.json({ message: 'Salle removed' });
        } else {
            res.status(404).json({ message: 'Salle not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getSalles, getSalleById, createSalle, updateSalle, deleteSalle };
