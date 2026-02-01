const express = require('express');
const router = express.Router();
const Bin = require('../models/Bin');

// Receive telemetry from IoT device (POST)
router.post('/telemetry', async (req, res) => {
  try {
    const { binId, fillLevel, status, location } = req.body;
    if (!binId) return res.status(400).json({ error: 'binId required' });

    const update = { fillLevel, status: status || 'OK', location, lastSeen: new Date() };
    const bin = await Bin.findOneAndUpdate({ binId }, update, { upsert: true, new: true, setDefaultsOnInsert: true });

    // emit to socket
    const io = require('../utils/socket').get();
    if (io) io.emit('bin:update', bin);

    res.json({ ok: true, bin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// list bins
router.get('/', async (req,res) => {
  const bins = await Bin.find().sort({ lastSeen: -1 });
  res.json(bins);
});

module.exports = router;
