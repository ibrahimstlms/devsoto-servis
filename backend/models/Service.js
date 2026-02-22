const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    plate: { type: String, required: true },
    markModel: { type: String, required: true },
    color: String,
    year: String,
    customerName: { type: String, required: true },
    customerPhone: String,
    vin: String,
    km: Number,
    description: String,
    photos: [String], // Base64 veya URL
    status: { type: String, default: 'Bekliyor' },
    createdAt: { type: Date, required: true },
    localId: { type: Number, required: true }, // Mobildeki SQLite ID'si
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
