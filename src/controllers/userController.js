  // src/controllers/userController.js

  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const bcrypt = require('bcrypt');

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error("ERROR REAL:", error); 
    res.status(500).json({ error: 'Error fetching users', detail: error.message });
    }
  };
 
  exports.getUserById = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: parseInt(req.params.id) },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  };

  exports.createUser = async (req, res) => {
  try {
    const { user_name, email, password, workshift_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        user_name,
        email,
        password: hashedPassword,
        workshift: {
          connect: { workshift_id: parseInt(workshift_id) }
        }
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user', detail: error.message });
  }
};

  exports.updateUser = async (req, res) => {
    try {
      const updatedUser = await prisma.user.update({
        where: { user_id: parseInt(req.params.id) },
        data: req.body,
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Error updating user' });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      await prisma.user.delete({
        where: { user_id: parseInt(req.params.id) },
      });
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Error deleting user' });
    }
  };

  module.exports={

getUserById: exports.getUserById,
getAllUsers:exports.getAllUsers,
createUser: exports.createUser,
deleteUser:exports.deleteUser,
updateUser:exports.updateUser


  }