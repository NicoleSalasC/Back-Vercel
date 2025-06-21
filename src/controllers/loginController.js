const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('../../auth');

exports.login = async (req, res) => {
  const { id, password } = req.body;

  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: parseInt(id) },
    });

    if (!teacher || teacher.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(teacher);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
