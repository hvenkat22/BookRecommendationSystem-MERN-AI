import express from "express";
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from "./config.js";
import cors from 'cors';
import BookRoutes from './routes/BookRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/books', BookRoutes);

// Default route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Book Store!');
});

// Connecting to MongoDB
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Connected to Database.');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("An error occurred while connecting to the database:", error);
    });
