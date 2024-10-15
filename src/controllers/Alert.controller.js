const Alert = require("../models/Alert");

class AlertController {

    static async addAlert(alertData) {
        // Adds the alert to the database
        try {
            const newAlert = await Alert.create(alertData);

            return await newAlert.save();
        } catch (error) {
            console.error(error);
        }
    }
    static async getAllAlerts() {
        try {
            return await Alert.find();
        } catch (error) {
            console.log(error);
        }
    }
    static async getAlertById(id) {
        try {
            const alert = await Alert.findById(id);
            
            if (!alert) throw new Error("Failed to find an Alert by ID");

        } catch (error) {
            console.log(error);
        }
    }
    static async updateAlert(updatedAlertData) {
        try {
            const updatedAlert = await updatedAlert.findByIdAndUpdate(id, updatedAlertData, {new: true});

            if (!updatedAlert) throw new Error("Updated alert failed");
        } catch(error) {
            console.log(error)
        }
    }
    static async deleteAlert(id) {
        try {
            const deletedAlert = await Alert.findByIdAndDelete(id);

            if (!deletedAlert) throw new Error("Failed to Delete Alert");
        } catch (error) {
            console.log(error);
        }
    }
    static async triggerAlertActions() {
        // This particular one will be implemented such that
        // A switch case executes a particular notification system
        // they will include; telegram, email, sms, webhooks, logs, etc
    }
}