const express = require('express');
const router = express.Router();
const {
  createReminder,
  getAllReminder,
  getReminder,
  updateReminder,
  deleteReminder,
} = require('../controllers/reminder');

router.route('/reminder').post(createReminder);
router.route('/reminder').get(getAllReminder);
router.route('/reminder/:id').patch(updateReminder);
router.route('/reminder/:id').get(getReminder);
router.route('/reminder/:id').delete(deleteReminder);

module.exports = router;
