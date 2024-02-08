const express = require("express");
const router = express.Router();
const RepairService = require("../../services/services/repairing_formService");

router.get("/", async (req, res) => {
  try {
    const forms = await RepairService.getAllRepairForms();
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});

router.get("/:formId", async (req, res) => {
  const formId = req.params.formId;
  try {
    const form = await RepairService.getRepairFormsById(formId);
    if (!form) {
      res.status(404).json({ error: "Form not found" });
    } else {
      res.status(200).json(form);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch form" });
  }
});

router.post("/", async (req, res) => {
  const newForm = req.body;
  try {
    const result = await RepairService.createRepairForms(newForm);
    res.status(201).json({ message: 'Your request have been submitted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new form' });
  }
});

router.put("/:formId", async (req, res) => {
  const formId = req.params.formId;
  const updatedForm = req.body;
  try {
    const result = await RepairService.updateRepairForms(formId, updatedForm);
    res.status(200).json({ message: 'Form updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the form' });
  }
});

router.delete("/:formId", async (req, res) => {
  const formId = req.params.formId;
  try {
    const result = await RepairService.deleteRepairForms(formId);
    res.status(200).json({ message: 'Form deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the form' });
  }
});

module.exports = router;
