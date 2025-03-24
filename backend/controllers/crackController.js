const Crack = require('../models/Crack');

const saveCrackData = async (req, res) => {
    try {
        const { latitude, longitude , severity, crackDepth } = req.body;
        const imageUrl = req.imageUrl; // Retrieved from middleware

        if ( !latitude || !longitude  || !severity || !crackDepth) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Save data to MongoDB
        const newCrack = new Crack({
            location: { lat: latitude, long: longitude },
            severity,
            crackDepth,
            image: imageUrl,
        });

        await newCrack.save();

        res.status(201).json({ message: 'Crack data saved successfully', crack: newCrack});
    } catch (error) {
        console.error('Failed to save crack data:', error);
        res.status(500).json({ error: 'Failed to save crack data' });
    }
};

module.exports = { saveCrackData };
