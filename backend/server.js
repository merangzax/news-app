const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// import route
const newsRoute = require('./routes/news');
app.use('/', newsRoute);

app.listen(3006, () => console.log('Server running on port 3006'));
