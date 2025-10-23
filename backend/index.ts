import dotenv from 'dotenv';

import express from 'express';
import userRoutes from './routes/user.route.js';
import connectDB from './lib/db.ts';

dotenv.config({
    path: './.env.local',
});

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
