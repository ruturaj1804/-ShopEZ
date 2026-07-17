const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    bannerImage: {
      type: String,
      default: '',
    },
    bannerTitle: {
      type: String,
      default: 'Welcome to ShopEZ',
    },
    bannerSubtitle: {
      type: String,
      default: 'Discover amazing products at great prices',
    },
    categories: [
      {
        name: { type: String, required: true },
        image: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
