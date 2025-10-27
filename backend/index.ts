import dotenv from 'dotenv';

import express from 'express';
import userRoutes from './routes/user.route.ts';
import trackingRoutes from './routes/tracking.route.ts';
import connectDB from './config/db.ts';
import cors from 'cors';
import { verifyToken } from './middlewares/verifyToken.ts';

dotenv.config({
    path: './.env.local',
});

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/packages', verifyToken, trackingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
