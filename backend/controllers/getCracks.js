const cracks = require('../models/Crack');

const getCracks = async (req, res) => {
    try {
        const cracksData = await cracks.find();
        res.status(200).json(cracksData);
    } catch (error) {
        console.error('Failed to fetch cracks:', error);
        res.status(500).json({ error: 'Failed to fetch cracks' });
    }
}

const updateStatus =  async (req, res) => {
    try {
      const { status } = req.body;
      const updatedCrack = await cracks.findByIdAndUpdate(req.params.id, { status }, { new: true });
  
      if (!updatedCrack) {
        return res.status(404).json({ message: 'Crack not found' });
      }
  
      res.json(updatedCrack);
    } catch (error) {
      res.status(500).json({ message: 'Error updating status', error });
    }
  };

module.exports = { getCracks, updateStatus };