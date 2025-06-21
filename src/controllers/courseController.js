// src/controllers/courseController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error getting courses' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error getting course' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await prisma.course.create({
      data: {
        course_code: req.body.course_code,
        course_name: req.body.course_name,
        modality_id: parseInt(req.body.modality_id),
        official_hours: parseInt(req.body.official_hours),
        active: req.body.active ?? true,
      },
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: 'Error creating course', detail: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: 'Error updating course' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await prisma.course.delete({
      where: { course_id: parseInt(req.params.id) },
    });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating course', detail: error.message });
  }
};
