const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['notificaiton', 'command', 'webhook', 'log', 'push_notification', 'sms', 'email', 'escalation', 'shutdown', 'restart'],
    },
    target: String, // recepient if email, sms, telegram e.t.c.
    command: String,// COMMANDS TO BE EXECUTED
    url: String,    // If webhook
    method: {       // if webhook
        type: String,
        enum: ['GET', 'POST', 'PUT', 'DELETE']
    },
    payload: mongoose.Schema.Types.Mixed,  // Data to be send out if any
    message: String,    // Message to be sent out
    device_id: String,  // Serial to the device that is sending
    severity: {
        type: String,
        enum: ['info', 'warning', 'error']
    },
});
const AlertSchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    timestamp: {
        type: BigInt,
        required: true,
    },
    severity: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false,
    },
    value: {
        type: mongoose.Schema.Types.Number,
        required: false
    },
    unit: {
        type: String,
        required: false
    },
    valueAlert: {
        type: Boolean,
        required: true
    },
    resolved: {
        type: Boolean,
        required: true,
    },
    actions: [actionSchema]  // Integrationg the actions array here

})

const Alert = new Schema('Alert', AlertSchema);

module.exports = Alert;