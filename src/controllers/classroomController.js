const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await prisma.classroom.findMany();
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching classrooms' });
  }
};

exports.getClassroomById = async (req, res) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: { classroom_id: parseInt(req.params.id) }
    });
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching classroom' });
  }
};

exports.createClassroom = async (req, res) => {
  try {
    const { classroom_code, location, classroom_capacity, type } = req.body;

    const newClassroom = await prisma.classroom.create({
      data: {
        classroom_code,
        location,
        classroom_capacity: parseInt(classroom_capacity),
        type
      }
    });

    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(500).json({ error: 'Error creating classroom', detail: error.message });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    const { classroom_code, location, classroom_capacity, type } = req.body;

    const updatedClassroom = await prisma.classroom.update({
      where: { classroom_id: parseInt(req.params.id) },
      data: {
        classroom_code,
        location,
        classroom_capacity: parseInt(classroom_capacity),
        type
      }
    });

    res.json(updatedClassroom);
  } catch (error) {
    res.status(400).json({ error: 'Error updating classroom', detail: error.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    await prisma.classroom.delete({
      where: { classroom_id: parseInt(req.params.id) }
    });
    res.json({ message: 'Classroom deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting classroom', detail: error.message });
  }
};
