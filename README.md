### Flight Booking Service

## Description
The Flight Booking Service is a web application designed to facilitate the booking and management of flight tickets. It utilizes a robust backend built with Node.js and Sequelize to handle complex transactions and ensure data consistency.

## Features
- **Flight Search**: Users can search for flights based on their preferred dates, destinations, and number of passengers.
- **Seat Selection**: Allows passengers to choose their seats during the booking process.
- **Booking Management**: Users can view, modify, or cancel their bookings.
- **Real-time Updates**: Flight statuses and seat availability are updated in real-time.
- **Automated Notifications**: Automated notifications for flight changes and reminders through cron jobs.

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MySQL, Sequelize ORM
- **Scheduling**: node-cron for handling scheduled tasks like notifications and reminders.
- **Message Queue**: RabbitMQ (amqplib) for asynchronous notification handling

## Prerequisites
- Node.js
- MySQL
- RabbitMQ
- npm

## Environment Configuration

This service requires environment variables to be configured. Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

### Required Environment Variables

- `PORT` - Server port (default: 3001)
- `DB_HOST` - Database host address
- `DB_PORT` - Database port (default: 3306)
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name (Flights)
- `DB_DIALECT` - Database dialect (mysql)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origins (default: *)
- `FLIGHT_SERVICE` - Flight service URL for integration
- `RECEPIENT_EMAIL` - Default recipient email for notifications
- `RABBITMQ_URL` - RabbitMQ connection URL (default: amqp://localhost:5672)
- `RABBITMQ_QUEUE` - Queue name for notifications (default: noti-queue)

### Health Check

The service provides a health check endpoint at `/health` for monitoring and orchestration purposes.