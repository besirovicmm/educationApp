// classes/service.js
const knex = require('../knex/knex');

class ClassesService {
  async getAllClasses() {
    return knex('classes');
  }

  async getClassById(id) {
    return knex('classes').where('id', id).first();
  }

  async createClass(classData) {
    const [newClass] = await knex('classes').insert({
      ...classData
    }).returning('*');
    return newClass;
  }

  async updateClass(id, classData) {
    const [updatedClass] = await knex('classes')
      .where('id', id)
      .update({
        ...classData,
        updated_at: new Date().toISOString()
      })
      .returning('*');
    
    if (!updatedClass) {
      throw new Error('Class not found');
    }
    return updatedClass;
  }

  async deleteClass(id) {
    const deletedCount = await knex('classes').where('id', id).del();
    if (deletedCount === 0) {
      throw new Error('Class not found');
    }
  }
}

module.exports = new ClassesService();