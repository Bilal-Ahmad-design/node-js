const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name..."],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have duration ..."],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size..."],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.6,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price..."],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "summary of the tour is a must"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'An image is required']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: [Date]
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
