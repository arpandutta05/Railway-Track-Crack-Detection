const mongoose = require('mongoose');

const crackSchema = new mongoose.Schema(
    {
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
        },
        id: {
            type: String,
            unique: true
        }
    },
    { timestamps: true }
);

// Pre-save hook to generate the `id` field
crackSchema.pre('save', function (next) {
    if (!this.id) {
        this.id = `TR-${this._id.toString().slice(-5)}`;
    }
    next();
});

module.exports = mongoose.model('Crack', crackSchema);
