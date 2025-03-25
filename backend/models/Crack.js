const mongoose = require('mongoose');

const crackSchema = new mongoose.Schema({
    location: {
        lat: {
            type: String,
            required: true
        },
        long: { 
            type: String, 
            required: true 
        }
    },
    severity: { 
        type: String, 
        required: true 
    },
    crackDepth: { 
        type: Number, 
        required: true 

    },
    status: { 
        type: String, 
        enum: ['pending', 'reviewed', 'resolved'], 
        default: 'pending'
    }
});

module.exports = mongoose.model('Crack', crackSchema);
