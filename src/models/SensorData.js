const mongoose = require("mongoose");

const sensorDataSchema = mongoose.Schema({

  deviceId: {
    type: String,
    ref: "Device",
  },
  timeStamp: {
    type: Date,
    default: Date.now
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Flexible data
  }

}, { strict: false });

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
