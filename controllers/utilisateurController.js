
import Utilisateur from '../models/Utilisateur.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, mot_de_passe } = req.body;
    try {
        const user = await Utilisateur.findOne({ email });

        if (user && (await user.matchPassword(mot_de_passe))) {
            res.json({
                _id: user._id,
                nom: user.nom,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;
    try {
        const userExists = await Utilisateur.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await Utilisateur.create({
            nom,
            email,
            mot_de_passe,
            role
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                nom: user.nom,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await Utilisateur.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new user (Admin)
// @route   POST /api/users/create
// @access  Public (requested)
const createUser = async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;
    try {
        const userExists = await Utilisateur.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await Utilisateur.create({
            nom,
            email,
            mot_de_passe,
            role
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                nom: user.nom,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public (requested)
const updateUser = async (req, res) => {
    const { nom, email, role } = req.body;

    try {
        const user = await Utilisateur.findById(req.params.id);

        if (user) {
            user.nom = nom || user.nom;
            user.email = email || user.email;
            user.role = role || user.role;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                nom: updatedUser.nom,
                email: updatedUser.email,
                role: updatedUser.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Public (requested)
const deleteUser = async (req, res) => {
    try {
        const user = await Utilisateur.findById(req.params.id);

        if (user) {
            await Utilisateur.deleteOne({ _id: user._id });
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { authUser, registerUser, getUsers, createUser, updateUser, deleteUser };
