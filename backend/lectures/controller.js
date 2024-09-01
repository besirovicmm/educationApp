const lecturesService = require('./service');

class LecturesController {
  async getAllLectures(req, res) {
    try {
      const { role, id: userId } = req.user;
      const { classId } = req.query;
      let lectures;

      if (role === 'teacher') {
        lectures = await lecturesService.getLecturesByTeacherId(userId, classId);
      } else if (role === 'student') {
        if (!classId) {
          return res.status(400).json({ message: 'Class ID is required for students' });
        }
        lectures = await lecturesService.getLecturesByClassId(classId);
      } else {
        return res.status(403).json({ message: 'Unauthorized role' });
      }
      
      res.json(lectures);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  async getLectureById(req, res) {
    console.log('object');
    try {
      const { classId, role, id: userId } = req.user;
      const lecture = await lecturesService.getLectureById(req.params.id);
      
      if (!lecture) {
        return res.status(404).json({ message: 'Lecture not found' });
      }
      
      if (role === 'teacher' && lecture.teacherId !== userId) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      
      if (role === 'student' && lecture.classId !== classId) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      
      res.json(lecture);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createLecture(req, res) {
    try {
      const { role, id: teacherId } = req.user;
      
      if (role !== 'teacher') {
        return res.status(403).json({ message: 'Only teachers can create lectures' });
      }
      
      const newLecture = await lecturesService.createLecture({ ...req.body, teacherId });
      res.status(201).json(newLecture);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateLecture(req, res) {
    try {
      const { role, id: userId } = req.user;
      
      if (role !== 'teacher') {
        return res.status(403).json({ message: 'Only teachers can update lectures' });
      }
      
      const lecture = await lecturesService.getLectureById(req.params.id);
      
      if (!lecture) {
        return res.status(404).json({ message: 'Lecture not found' });
      }
      
      if (lecture.teacherId !== userId) {
        return res.status(403).json({ message: 'Unauthorized to update this lecture' });
      }
      
      const updatedLecture = await lecturesService.updateLecture(req.params.id, req.body);
      res.json(updatedLecture);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteLecture(req, res) {
    try {
      const { role, id: userId } = req.user;
      
      if (role !== 'teacher') {
        return res.status(403).json({ message: 'Only teachers can delete lectures' });
      }
      
      const lecture = await lecturesService.getLectureById(req.params.id);
      
      if (!lecture) {
        return res.status(404).json({ message: 'Lecture not found' });
      }
      
      if (lecture.teacherId !== userId) {
        return res.status(403).json({ message: 'Unauthorized to delete this lecture' });
      }
      
      await lecturesService.deleteLecture(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new LecturesController();