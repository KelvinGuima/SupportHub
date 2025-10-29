const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use('/api', routes);

// Healthcheck
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handler
app.use(errorHandler);

module.exports = app;