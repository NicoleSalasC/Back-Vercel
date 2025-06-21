// src/routes/declarationRoute.js
const express = require('express');
const router = express.Router();
const declarationController = require('../controllers/declarationController');

router.get('/', declarationController.getAllDeclarations);
router.get('/:id', declarationController.getDeclarationById);
router.post('/', declarationController.createDeclaration);
router.put('/:id', declarationController.updateDeclaration);
router.delete('/:id', declarationController.deleteDeclaration);

module.exports = router;
