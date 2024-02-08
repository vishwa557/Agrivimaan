const Spraying_Details = require('../../models/services/spraying_formModel');

class SprayingService {
  static async getAllSprayingForms() {
    try {
      return await Spraying_Details.getAllSprayingForms();
    } catch (error) {
      throw error;
    }
  }

  static async getSprayingFormsById(sprayingId) {
    try {
      return await Spraying_Details.getSprayingFormsById(sprayingId);
    } catch (error) {
      throw error;
    }
  }

  static async createSprayingForms(sprayingData) {
    try {
      const newSpraying = {
        pilotId: sprayingData.pilotId,
        droneId: sprayingData.droneId,
        userId: sprayingData.userId,
        userName: sprayingData.userName,
        phoneNumber: sprayingData.phoneNumber,
        serviceCategory: sprayingData.serviceCategory,
        acersToSpray: sprayingData.acersToSpray,
        chemicalUsed: sprayingData.chemicalUsed,
        serviceRequestedDate: sprayingData.serviceRequestedDate,
        sprayingStatus: sprayingData.sprayingStatus,
        Country: sprayingData.Country,
        StreetAddress: sprayingData.StreetAddress,
        City: sprayingData.City,
        State: sprayingData.State,
        Zip: sprayingData.Zip
      };

      const createdSpraying = await Spraying_Details.createSprayingForms(newSpraying);
      return createdSpraying;
    } catch (error) {
      throw error;
    }
  }

  static async updateSprayingForms(sprayingId, updatedSpraying) {
    try {
      return await Spraying_Details.updateSprayingForms(sprayingId, updatedSpraying);
    } catch (error) {
      throw error;
    }
  }

  static async deleteSprayingForms(sprayingId) {
    try {
      return await Spraying_Details.deleteSprayingForms(sprayingId);
    } catch (error) {
      throw error;
    }
  }

  static async createTable() {
    try {
      return await Spraying_Details.createTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SprayingService;
