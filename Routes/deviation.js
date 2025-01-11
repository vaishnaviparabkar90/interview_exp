const express = require('express');
const Crypto = require('../models/Crypto');
const { std } = require('mathjs');

const router = express.Router();

router.get('/', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Query parameter "coin" is required' });
  }

  try {
    const records = await Crypto.find({ name: coin })
      .sort({ lastUpdated: -1 })
      .limit(100);

    if (records.length === 0) {
      return res.status(404).json({ error: 'No data available for the given cryptocurrency' });
    }

    const prices = records.map(record => record.currentPrice);

    if (prices.length < 2) {
      return res.status(400).json({ error: 'Not enough data to calculate standard deviation' });
    }

    const deviation = std(prices);

    res.json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (error) {
    console.error('Error calculating deviation:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
