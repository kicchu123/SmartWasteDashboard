const mongoose = require('mongoose');

const BinSchema = new mongoose.Schema({
  binId: { type: String, unique: true, required: true },
  location: { type: String, default: 'Unknown' },
  fillLevel: { type: Number, default: 0 }, // 0-100
  status: { type: String, enum: ['OK','ERROR','MAINTENANCE'], default: 'OK' },
  lastSeen: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bin', BinSchema);
