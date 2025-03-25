const express = require('express');
const { saveCrackData } = require('../controllers/crackController');

const router = express.Router();

// Route to upload an image and save crack data
router.post('/upload', saveCrackData);

module.exports = router;
