import dotenv from 'dotenv';

import express from 'express';
import userRoutes from './routes/user.route.ts';
import connectDB from './lib/db.ts';
import cors from 'cors';

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
