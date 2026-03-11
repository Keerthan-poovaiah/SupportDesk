const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL");
    })
    .catch(err => {
        console.error("Database connection error", err);
    });

app.get('/', (req, res) => {
    res.send('SupportDesk API Running');
});

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/tickets', commentRoutes);

module.exports = app;