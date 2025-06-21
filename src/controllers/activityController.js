// src/controllers/activityController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching activities' });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const activity = await prisma.activity.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching activity' });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const {
      declaration_id,
      activity_type_id,
      course_id,
      classroom_id,
      weekday,
      start_time,
      end_time,
      description,
      start_date,
      end_date
    } = req.body;

    const newActivity = await prisma.activity.create({
      data: {
       declaration_id,
    activity_type_id,
    course_id,
    classroom_id,
    weekday,
    start_time: new Date(`1970-01-01T${start_time}`),
    end_time: new Date(`1970-01-01T${end_time}`),  
    description,
    start_date: new Date(start_date),
    end_date: new Date(end_date)
      },
    });
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: 'Error creating activity', detail: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const updatedActivity = await prisma.activity.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ error: 'Error updating activity' });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    await prisma.activity.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting activity' });
  }
};
