// src/controllers/declarationController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllDeclarations = async (req, res) => {
  try {
    const declarations = await prisma.declaration.findMany();
    res.json(declarations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching declarations' });
  }
};

exports.getDeclarationById = async (req, res) => {
  try {
    const declaration = await prisma.declaration.findUnique({
      where: { djh_id: parseInt(req.params.id) },
    });
    res.json(declaration);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching declaration' });
  }
};

exports.createDeclaration = async (req, res) => {
  try {
   const newDeclaration = await prisma.declaration.create({
  data: {
    user_id: parseInt(req.body.user_id),
    status_id: parseInt(req.body.status_id),
    creation_date: new Date(req.body.creation_date),
    teacher_signature: req.body.teacher_signature ?? false,
    academic_cycle: req.body.academic_cycle,
    version: req.body.version ?? 1,
  },
})

    res.status(201).json(newDeclaration);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating declaration', detail: error.message });
  }
};

exports.updateDeclaration = async (req, res) => {
  try {
    const updated = await prisma.declaration.update({
      where: { djh_id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Error updating declaration' });
  }
};

exports.deleteDeclaration = async (req, res) => {
  try {
    await prisma.declaration.delete({
      where: { djh_id: parseInt(req.params.id) },
    });
    res.json({ message: 'Declaration deleted' });
  } catch (error) {
   res.status(500).json({ error: 'Error deleting a declaration', detail: error.message });
  }
};
