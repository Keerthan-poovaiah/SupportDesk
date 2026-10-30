const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getAgents
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/agents', authMiddleware, getAgents);

module.exports = router;