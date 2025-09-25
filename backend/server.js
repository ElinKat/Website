// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const __dirname = path.resolve();

app.use(express.json()); // allow us to accept JSON data in the req.body

app.use('/api/products', productRoutes);

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('__dirname:', __dirname);
console.log('Frontend dist path:', path.join(__dirname, '/frontend/dist'));

if (process.env.NODE_ENV === 'production') {
    console.log('Serving static files from:', path.join(__dirname, '/frontend/dist'));
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        console.log('Serving index.html for route:', req.path);
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
} else {
    console.log('Not in production mode, not serving static files');
}


app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});

