const express = require("express");
const router = express.Router();
const AdminService = require("../models/adminModel");
const verifyToken = require("../middleware/verifyToken");

router.get("/admins", async (req, res) => {
    try {
      const admins = await AdminService.getAllAdmins();
      res.status(200).json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch admins" });
    }
  });
  
  router.get("/admins/:adminId", async (req, res) => {
    const adminId = req.params.adminId;
    try {
      const admin = await AdminService.getAdminById(adminId);
      if (!admin) {
        res.status(404).json({ error: "Admin not found" });
      } else {
        res.status(200).json(admin);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch admin" });
    }
  });
  
  router.post("/admins", verifyToken, async (req, res) => {
    const newAdmin = req.body;
    try {
      const result = await AdminService.createAdmin(newAdmin);
      res.status(201).json({ message: 'Admin created successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new admin' });
    }
  });
  
  router.put("/admins/:adminId", async (req, res) => {
    const adminId = req.params.adminId;
    const updatedAdmin = req.body;
    try {
      const result = await AdminService.updateAdmin(adminId, updatedAdmin);
      res.status(200).json({ message: 'Admin updated successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update the admin' });
    }
  });
  
  module.exports = router;