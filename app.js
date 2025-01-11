const express = require('express');
const cron = require('node-cron');
const fetchCryptoData = require('./FetchData/fetchCryptoData');
const statsRoute = require('./Routes/stats');
const deviationRoute = require('./Routes/deviation');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
connectDB();
// Schedule to run every 2 hours

//fetchCryptoData();
cron.schedule('0 */2 * * *', fetchCryptoData);

app.use('/stats', statsRoute);
app.use('/deviation', deviationRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
