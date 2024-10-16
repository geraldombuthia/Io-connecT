const mongoose = require('mongoose');
// keeps track of sockets currrently active and functional
const SocketConnSchema = new mongoose.Schema({
    socketId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }
});

module.exports = mongoose.model("SocketConn", SocketConnSchema)