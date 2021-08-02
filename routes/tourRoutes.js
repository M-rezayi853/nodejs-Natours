const express = require('express');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkBody,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protect, restricTo } = require('../controllers/authController');

const router = express.Router();

// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(protect, getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restricTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
