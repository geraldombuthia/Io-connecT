const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String, // Also chipID
        required: true,
        index: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
        unique: false
    },
    firmwareVersion: {
        type: String,
        required: true
    },
    lastConnected: Date,
    status: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;