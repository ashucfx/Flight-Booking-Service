const express = require('express');

const { BookingController } = require('../../controllers');

const router = express.Router();

// GET /api/v1/bookings - Get all bookings
router.get(
    '/',
    BookingController.getAllBookings
);

// POST /api/v1/bookings - Create booking
router.post(
    '/',
    BookingController.createBooking
);

// GET /api/v1/bookings/:id - Get booking by ID
router.get(
    '/:id',
    BookingController.getBookingById
);

// DELETE /api/v1/bookings/:id - Cancel booking
router.delete(
    '/:id',
    BookingController.cancelBooking
);

// POST /api/v1/bookings/payments - Make payment
router.post(
    '/payments',
    BookingController.makePayment
);

module.exports = router;