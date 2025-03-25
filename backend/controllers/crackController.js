const Crack = require('../models/Crack');

const saveCrackData = async (req, res) => {
    try {
        const { latitude, longitude , severity, crackDepth } = req.body;

        if ( !latitude || !longitude  || !severity || !crackDepth) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Save data to MongoDB
        const newCrack = new Crack({
            location: { lat: latitude, long: longitude },
            severity,
            crackDepth
        });

        await newCrack.save();

        res.status(201).json({ message: 'Crack data saved successfully'});
    } catch (error) {
        console.error('Failed to save crack data:', error);
        res.status(500).json({ error: 'Failed to save crack data' });
    }
};

module.exports = { saveCrackData };
