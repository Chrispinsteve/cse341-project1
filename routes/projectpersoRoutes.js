const express = require('express');
const router = express.Router();
const projectpersoController = require('../controllers/projectpersoController');

// Define routes for projectperso
router.post('/', projectpersoController.createProjectPerso);
router.get('/', projectpersoController.getAllProjects);
router.put('/:id', projectpersoController.updateProject);
router.delete('/:id', projectpersoController.deleteProject);

module.exports = router;
