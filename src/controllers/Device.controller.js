const Device = require("../models/Device");

class DeviceController {

    static async registeDevice(userId, deviceInfo) {
        try {
            const newDevice = new Device({
                userId,
                name: deviceInfo.name,
                type: deviceInfo.type,
                location: deviceInfo.location,
                status: 'inactive',
            });
            await newDevice.save();
            return newDevice;
        } catch (err) {
            console.error('Error registering the device:', error);
            throw error;
        }
    }
    static async getUserDevices(userId) {
        try {
            return await Device.find({userId});
        } catch (error) {
            console.error("Erro fetching user devices: ", error);
            throw error;
        }
    }
    static async getDevice(deviceId) {
        try {
            return await Device.find({userId});

        } catch (error) {
            console.log("Error fetching device: ", error);
            throw error;
        }
    }
    static async updateDeviceStatus(deviceId, status) {
        try {
            return await Device.findByIdAndUpdate(deviceId, {status}, {new: true});
        } catch(error) {
            console.error("Error updating device status ", error);
            throw error;
        }
    }

    static async handleSensorData(deviceId, data) {
        try {
            const storeData = new SensorData({
                deviceId,
                timeStamp: new Date(),
                ...data
            })
            await SensorData.save();
            await DeviceController.updateDeviceStatus(deviceId, 'active');
        } catch (error) {
            console.log("Error handlingSensorData");
            throw error;
        }
    }
}

module.exports = DeviceController;