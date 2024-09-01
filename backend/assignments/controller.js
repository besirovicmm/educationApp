// assignments/controller.js
const assignmentsService = require('./service');

class AssignmentsController {
  async getAllAssignments(req, res) {
    try {
      const { role, id: userId } = req.user;
      const { classId } = req.query;
      let assignments;

      if (role === 'teacher') {
        assignments = await assignmentsService.getAssignmentsByTeacherId(userId, classId);
      } else if (role === 'student') {
        if (!classId) {
          return res.status(400).json({ message: 'Class ID is required for students' });
        }
        assignments = await assignmentsService.getAssignmentsByClassId(classId);
      } else {
        return res.status(403).json({ message: 'Unauthorized role' });
      }
      
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAssignmentById(req, res) {
    try {
      const { role, id: userId, classId } = req.user;
      const assignment = await assignmentsService.getAssignmentById(req.params.id);
      
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      
      if (role === 'teacher' && assignment.teacherId !== userId) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      
      if (role === 'student' && assignment.classId !== classId) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createAssignment(req, res) {
    try {
      const { id: teacherId } = req.user;
      const newAssignment = await assignmentsService.createAssignment({ ...req.body, teacherId });
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateAssignment(req, res) {
    try {
      const { id: teacherId } = req.user;
      const assignment = await assignmentsService.getAssignmentById(req.params.id);
      
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      
      if (assignment.teacherId !== teacherId) {
        return res.status(403).json({ message: 'Unauthorized to update this assignment' });
      }
      
      const updatedAssignment = await assignmentsService.updateAssignment(req.params.id, req.body);
      res.json(updatedAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteAssignment(req, res) {
    try {
      const { id: teacherId } = req.user;
      const assignment = await assignmentsService.getAssignmentById(req.params.id);
      
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      
      if (assignment.teacherId !== teacherId) {
        return res.status(403).json({ message: 'Unauthorized to delete this assignment' });
      }
      
      await assignmentsService.deleteAssignment(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AssignmentsController();