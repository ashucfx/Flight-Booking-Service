const amqplib = require('amqplib');
const serverConfig = require('./server-config');

let channel, connection;

async function connectQueue(){
    try {
        connection = await amqplib.connect(serverConfig.RABBITMQ_URL);
        channel = await connection.createChannel();

        await channel.assertQueue(serverConfig.RABBITMQ_QUEUE);
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        throw error;
    }
}

async function sendData(data){
    try {
        await channel.sendToQueue(serverConfig.RABBITMQ_QUEUE, Buffer.from(JSON.stringify(data)));
        
    } catch (error) {
        console.error('Failed to send data to queue:', error);
        throw error;
    }
}

module.exports = {
    connectQueue,
    sendData
}
