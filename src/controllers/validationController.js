// src/controllers/validationController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllValidations = async (req, res) => {
  try {
    const validations = await prisma.validation.findMany({
      include: {
        user: true,
        declaration: true,
        status: true,
      },
    });
    res.json(validations);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving validations' });
  }
};

exports.getValidationById = async (req, res) => {
  const { id } = req.params;
  try {
    const validation = await prisma.validation.findUnique({
      where: { validation_id: parseInt(id) },
      include: {
        user: true,
        declaration: true,
        status: true,
      },
    });
    if (!validation) {
      return res.status(404).json({ error: 'Validation not found' });
    }
    res.json(validation);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving validation' });
  }
};

exports.createValidation = async (req, res) => {
  const {
    declaration_id,
    validator_id,
    validation_date,
    notes,
    validation_status
  } = req.body;

  try {
    const newValidation = await prisma.validation.create({
      data: {
        declaration_id,
        validator_id,
        validation_date: new Date(validation_date),
        notes,
        validation_status
      }
    });

    // Si es aprobado (2) o rechazado (3), actualizar el estado de la declaración
    if ([2, 3].includes(validation_status)) {
      await prisma.declaration.update({
        where: { djh_id: declaration_id },
        data: {
          status_id: validation_status
        }
      });
    }

    res.status(201).json(newValidation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating validation', detail: error.message });
  }
};
exports.updateValidation = async (req, res) => {
  const { id } = req.params;
  const {
    declaration_id,
    validator_id,
    validation_date,
    notes,
    validation_status
  } = req.body;

  const data = {};
  if (declaration_id !== undefined) data.declaration_id = declaration_id;
  if (validator_id !== undefined) data.validator_id = validator_id;
  if (validation_date) data.validation_date = new Date(validation_date);
  if (notes !== undefined) data.notes = notes;
  if (validation_status !== undefined) data.validation_status = validation_status;

  try {
    const updatedValidation = await prisma.validation.update({
      where: { validation_id: parseInt(id) },
      data
    });

    // Si se actualizó el estado a Aprobado o Rechazado
    if ([2, 3].includes(validation_status)) {
      const declId = declaration_id || updatedValidation.declaration_id;

      await prisma.declaration.update({
        where: { djh_id: declId },
        data: {
          status_id: validation_status
        }
      });
    }

    res.json(updatedValidation);
  } catch (error) {
    res.status(400).json({ error: 'Error updating validation', detail: error.message });
  }
};



exports.deleteValidation = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.validation.delete({
      where: { validation_id: parseInt(id) },
    });
    res.json({ message: 'Validation deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting validation' });
  }
};
