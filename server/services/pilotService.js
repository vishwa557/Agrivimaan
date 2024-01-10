const Pilot = require('../models/pilotModel');

class PilotService {
  static async getAllPilots() {
    try {
      return await Pilot.getAllPilots();
    } catch (error) {
      throw error;
    }
  }

  static async getPilotById(pilotId) {
    try {
      return await Pilot.getPilotById(pilotId);
    } catch (error) {
      throw error;
    }
  }

  static async createPilot(newPilot) {
    try {
      return await Pilot.createPilot(newPilot);
    } catch (error) {
      throw error;
    }
  }

  static async updatePilot(pilotId, updatedPilot) {
    try {
      return await Pilot.updatePilot(pilotId, updatedPilot);
    } catch (error) {
      throw error;
    }
  }

  static async createTable() {
    try {
      return await Pilot.createTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PilotService;
