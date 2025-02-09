const { dbProjectPerso } = require('../data/database');

exports.createProjectPerso = async (req, res) => {
  try {
    const { firstName, lastName, email, professionalName, description, birthday, phone } = req.body;

    // Validate data
    if (!firstName || !lastName || !email || !professionalName || !birthday || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProject = await dbProjectPerso.collection('projectperso').insertOne(req.body);
    res.status(201).json(newProject.ops[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating projectperso', error: err });
  }
};

// Add other CRUD functions for GET, PUT, DELETE...
