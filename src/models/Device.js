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
    serialnumber: {
        type: String, // Also chipID
        // required: true,
        index: true,
        // unique: true
    },
    location: {
        type: String,
        required: true,
    },
    firmwareVersion: {
        type: String,
        required: false
    },
    lastConnected: Date,
    status: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

DeviceSchema.index({name: 1, serialnumber: 1, user: 1}, {unique: true});


const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;