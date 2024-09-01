const knex = require('../knex/knex');

class QuestionsService {
  async getAllQuestions(classId) {
    return knex('questions').where('classId', classId);
  }

  async getQuestionById(id) {
    return knex('questions').where('id', id).first();
  }

  async createQuestion(questionData) {
    const [newQuestion] = await knex('questions').insert({
      ...questionData
    }).returning('*');
    return newQuestion;
  }

  async updateQuestion(id, questionData) {
    const [updatedQuestion] = await knex('questions')
      .where('id', id)
      .update({
        ...questionData,
        updated_at: new Date().toISOString()
      })
      .returning('*');
    return updatedQuestion;
  }

  async deleteQuestion(id) {
    // Note: Deleting associated comments should be handled by a database trigger or constraint
    await knex('questions').where('id', id).del();
  }
}

module.exports = new QuestionsService();
