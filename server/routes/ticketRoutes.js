const express = require('express');
const router = express.Router();

const { createTicket } = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');
const { getTickets } = require('../controllers/ticketController');

router.post('/', authMiddleware, createTicket);
router.get('/', authMiddleware, getTickets);

module.exports = router;