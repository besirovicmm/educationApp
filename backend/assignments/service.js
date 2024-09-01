// assignments/service.js
const knex = require('../knex/knex');

class AssignmentsService {
  async getAllAssignments() {
    return knex('assignments').select('*');
  }

  async getAssignmentsByTeacherId(teacherId, classId = null) {
    let query = knex('assignments').where('teacherId', teacherId);

    if (classId) {
      query = query.where('classId', classId);
    }

    return query;
  }

  async getAssignmentsByClassId(classId) {
    return knex('assignments').where('classId', classId);
  }

  async getAssignmentsByClassId(classId) {
    return knex('assignments').where('classId', classId);
  }

  async getAssignmentById(id) {
    return knex('assignments').where('id', id).first();
  }

  async createAssignment(assignmentData) {
    const [newAssignment] = await knex('assignments').insert({
      ...assignmentData
    }).returning('*');
    return newAssignment;
  }

  async updateAssignment(id, assignmentData) {
    const [updatedAssignment] = await knex('assignments')
      .where('id', id)
      .update({
        ...assignmentData,
        updated_at: new Date().toISOString()
      })
      .returning('*');
    
    if (!updatedAssignment) {
      throw new Error('Assignment not found');
    }
    return updatedAssignment;
  }

  async deleteAssignment(id) {
    const deletedCount = await knex('assignments').where('id', id).del();
    if (deletedCount === 0) {
      throw new Error('Assignment not found');
    }
  }
}

module.exports = new AssignmentsService();