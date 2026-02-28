const express = require('express');
const cors = require('cors');
const { serverConfig, Logger, Queue } = require('./config');
const apiRoutes = require('./routes');
const CRON = require('./utils/common/cron-jobs');

const app = express();

// CORS configuration - only allow specified origins
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000', 'http://localhost:3002', 'http://frontend:3000'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Service is healthy',
        timestamp: new Date().toISOString(),
        service: 'Booking Service',
        uptime: process.uptime()
    });
});

app.use('/api', apiRoutes);
app.use('/bookingService/api', apiRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Exception:', err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        data: {},
        error: err.explanation || err
    });
});



app.listen(serverConfig.PORT, async () => {
    console.log(`Successfully started the server at port ${serverConfig.PORT}`);
    Logger.info('Successfully Started The Server', 'root', {});
    CRON();
    await Queue.connectQueue();
    console.log('Queue Connected');

}) 