const Device = require("../models/Device");

class DeviceController {

    static async registerDevice(userId, deviceInfo) {
        try {
            if (!deviceInfo.serialnumber) {
                throw new Error('Serial number is required.');
            }
            const newDevice = new Device({
                user: userId,
                name: deviceInfo.name,
                type: deviceInfo.type,
                serialnumber: deviceInfo.serialnumber,
                location: deviceInfo.location,
                status: 'inactive',
            });

            console.log("New Device Object: ", newDevice);
            await newDevice.save();
            return newDevice;
        } catch (err) {
            console.error('Error registering the device:', err);
            throw err;
        }
    }
    static async getUserDevices(userId) {
        try {
            return await Device.find({user: userId});
        } catch (error) {
            console.error("Error fetching user devices: ", error);
            //throw error;
        }
    }
    static async getDevice(deviceId) {
        try {
            return await Device.find({userId});

        } catch (error) {
            console.log("Error fetching device: ", error);
            //throw error;
        }
    }
    static async updateDeviceStatus(deviceId, status) {
        try {
            return await Device.findByIdAndUpdate(deviceId, {status}, {new: true});
        } catch(error) {
            console.error("Error updating device status ", error);
            //throw error;
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
            //throw error;
        }
    }
}

module.exports = DeviceController;