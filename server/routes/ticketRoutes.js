const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const { createTicket } = require('../controllers/ticketController');
const { getTickets } = require('../controllers/ticketController');
const { updateTicketStatus } = require('../controllers/ticketController');
const { getTicketDetails } = require('../controllers/ticketController');

router.post('/', authMiddleware, createTicket);
router.get('/', authMiddleware, getTickets);
router.patch('/:id/status', authMiddleware, updateTicketStatus);
router.get('/:id', authMiddleware, getTicketDetails);

module.exports = router;