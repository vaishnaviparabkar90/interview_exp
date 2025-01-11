const axios = require('axios');
const Crypto = require('../models/Crypto');

const fetchCryptoData = async () => {
    
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,matic-network,ethereum',
      },
    });
  

    const cryptos = response.data;

    for (const coin of cryptos) {
      const record = new Crypto({
        name: coin.id,
        currentPrice: coin.current_price,
        marketCap: coin.market_cap,
        change24h: coin.price_change_percentage_24h,
      });

      await record.save();
    }

    console.log('Crypto data updated successfully.');
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

module.exports = fetchCryptoData;
