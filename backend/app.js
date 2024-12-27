const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()
const crawlerRoutes = require('./routes/crawler');
app.use(express.json());
app.use(cors())
app.use('/api/crawler', crawlerRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
