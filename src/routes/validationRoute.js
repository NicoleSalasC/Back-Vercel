// src/routes/validationRoute.js
const express = require('express');
const router = express.Router();
const validationController = require('../controllers/validationController');

router.get('/', validationController.getAllValidations);
router.get('/:id', validationController.getValidationById);
router.post('/', validationController.createValidation);
router.put('/:id', validationController.updateValidation);
router.delete('/:id', validationController.deleteValidation);

module.exports = router;
