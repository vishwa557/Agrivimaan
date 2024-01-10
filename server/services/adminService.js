const Admin = require('../models/adminModel');

class AdminService {
  static async getAllAdmins() {
    try {
      return await Admin.getAllAdmins();
    } catch (error) {
      throw error;
    }
  }

  static async getAdminById(adminId) {
    try {
      return await Admin.getAdminById(adminId);
    } catch (error) {
      throw error;
    }
  }

  static async createAdmin(newAdmin) {
    try {
      return await Admin.createAdmin(newAdmin);
    } catch (error) {
      throw error;
    }
  }

  static async updateAdmin(adminId, updatedAdmin) {
    try {
      return await Admin.updateAdmin(adminId, updatedAdmin);
    } catch (error) {
      throw error;
    }
  }

  static async createTable() {
    try {
      return await Admin.createTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdminService;
