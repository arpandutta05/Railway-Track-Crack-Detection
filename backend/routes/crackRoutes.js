const express = require('express');
const { saveCrackData } = require('../controllers/crackController');
const { getCracks, updateStatus } = require('../controllers/getCracks');

const router = express.Router();

// Route to upload an image and save crack data
router.post('/upload', saveCrackData);
router.get('/cracks', getCracks);
router.put('/cracks/:id', updateStatus);

module.exports = router;
