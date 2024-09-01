// classes/controller.js
const classesService = require('./service');

class ClassesController {
  async getAllClasses(req, res) {
    try {
      const classes = await classesService.getAllClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getClassById(req, res) {
    try {
      const classItem = await classesService.getClassById(req.params.id);
      
      if (!classItem) {
        return res.status(404).json({ message: 'Class not found' });
      }
      
      res.json(classItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createClass(req, res) {
    try {
      const newClass = await classesService.createClass(req.body);
      res.status(201).json(newClass);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateClass(req, res) {
    try {
      const updatedClass = await classesService.updateClass(req.params.id, req.body);
      res.json(updatedClass);
    } catch (error) {
      if (error.message === 'Class not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }

  async deleteClass(req, res) {
    try {
      await classesService.deleteClass(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Class not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }
}

module.exports = new ClassesController();