const express = require('express');
const Crypto = require('../models/Crypto');

const router = express.Router();

router.get('/', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Query parameter "coin" is required' });
  }

  try {
    const latestRecord = await Crypto.findOne({ name: coin }).sort({ lastUpdated: -1 });

    if (!latestRecord) {
      return res.status(404).json({ error: 'Cryptocurrency not found' });
    }

    res.json({
      price: latestRecord.currentPrice,
      marketCap: latestRecord.marketCap,
      '24hChange': latestRecord.change24h,
    });
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
