const QuestionsService = require('./service');

class QuestionsController {
  async getAllQuestions(req, res) {
    try {
      const { role, id: userId } = req.user;  
      const { classId } = req.query;
      let questions;
  
      if (role === 'teacher') {
        questions = await QuestionsService.getAllQuestions(userId, classId);
      } else if (role === 'student') {
        if (!classId) {
          return res.status(400).json({ message: 'Class ID is required for students' });
        }
        questions = await QuestionsService.getAllQuestions(null, classId);
      } else {
        return res.status(403).json({ message: 'Unauthorized role' });
      }
  
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

  async getQuestionById(req, res) {
    try {
      const question = await QuestionsService.getQuestionById(req.params.id);
      if (question) {
        res.json(question);
      } else {
        res.status(404).json({ message: 'Question not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createQuestion(req, res) {
    try {
      const questionData = {
        ...req.body,
        teacherId: req.user.id,
      };
      const newQuestion = await QuestionsService.createQuestion(questionData);
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateQuestion(req, res) {
    try {
      const updatedQuestion = await QuestionsService.updateQuestion(req.params.id, req.body);
      if (updatedQuestion) {
        res.json(updatedQuestion);
      } else {
        res.status(404).json({ message: 'Question not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteQuestion(req, res) {
    try {
      await QuestionsService.deleteQuestion(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new QuestionsController();
