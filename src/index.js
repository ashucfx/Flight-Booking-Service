const express = require('express');
const cors = require('cors');
const {serverConfig, Logger, Queue} = require('./config');
const apiRoutes = require('./routes');
const CRON = require('./utils/common/cron-jobs');

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
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

app.use('/api',apiRoutes);
app.use('/bookingService/api',apiRoutes);



app.listen(serverConfig.PORT,async ()=>{
    console.log(`Successfully started the server at port ${serverConfig.PORT}`);
    Logger.info('Successfully Started The Server','root',{});
    CRON();
    await Queue.connectQueue();
    console.log('Queue Connected');

}) 