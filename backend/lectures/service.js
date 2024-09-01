// lectures/service.js
const knex = require('../knex/knex');

class LecturesService {
  async getAllLectures() {
    return knex('lectures').select('*');
  }

  async getLecturesByTeacherId(teacherId, classId = null) {
    let query = knex('lectures').where('teacherId', teacherId);

    if (classId) {
      query = query.where('classId', classId);
    }

    return query;
  }

  async getLecturesByClassId(classId) {
    return knex('lectures').where('classId', classId);
  }

  async getLecturesByClassId(classId) {
    return knex('lectures').where('classId', classId);
  }

  async getLecturesByClassId(classId) {
    return knex('lectures').where('classId', classId);
  }

  async getLectureById(id) {
    return knex('lectures').where('id', id).first();
  }

  async createLecture(lectureData) {
    const [newLecture] = await knex('lectures').insert({
      ...lectureData
    }).returning('*');
    return newLecture;
  }

  async updateLecture(id, lectureData) {
    const [updatedLecture] = await knex('lectures')
      .where('id', id)
      .update({
        ...lectureData,
        updated_at: new Date().toISOString()
      })
      .returning('*');
    
    if (!updatedLecture) {
      throw new Error('Lecture not found');
    }
    return updatedLecture;
  }

  async deleteLecture(id) {
    const deletedCount = await knex('lectures').where('id', id).del();
    if (deletedCount === 0) {
      throw new Error('Lecture not found');
    }
  }
}

module.exports = new LecturesService();