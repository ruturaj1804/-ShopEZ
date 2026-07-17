const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getSettings,
  updateSettings,
} = require('../controllers/adminController');

router.get('/dashboard', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/users/:id', protect, adminOnly, deleteUser);
router.get('/settings', getSettings);
router.put('/settings', protect, adminOnly, updateSettings);

module.exports = router;
