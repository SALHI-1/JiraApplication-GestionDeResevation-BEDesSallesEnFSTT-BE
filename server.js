
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import salleRoutes from './routes/salleRoutes.js';
import utilisateurRoutes from './routes/utilisateurRoutes.js';
import creneauRoutes from './routes/creneauRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/salles', salleRoutes);
app.use('/api/users', utilisateurRoutes);
app.use('/api/creneaux', creneauRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
