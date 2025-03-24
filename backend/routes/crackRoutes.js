const express = require('express');
const uploadImage = require('../middlewares/uploadImage');
const { saveCrackData } = require('../controllers/crackController');

const router = express.Router();

// Route to upload an image and save crack data
router.post('/upload', uploadImage, saveCrackData);

module.exports = router;
