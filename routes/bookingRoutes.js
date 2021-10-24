const express = require('express');
const bookingController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));
router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);
//git commit
router
  .route('/:id')
  .get(bookingController.getAllBooking.updateBooking)
  .delete(bookingController.deleteBooking);
module.exports = router;
