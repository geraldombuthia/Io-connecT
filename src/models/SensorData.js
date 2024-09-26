const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  data: Schema.Types.mixed, // Flexible data

}, {strict: false});

const SensorData = mongoose.Schema('SensorData', sensorDataSchema);

module.exports = SensorData;
