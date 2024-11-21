import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import listRoutes from './routes/listRoutes.js';
import { connectDB } from './utils/dbConnect.js';
import { fetchAndSaveCodes } from './utils/fetchAndSaveCodes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);

const PORT = process.env.PORT || 5000;

(async()=>{
    try {
        await connectDB();
        await fetchAndSaveCodes();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.log(error?.message);
    }
})();
