function up(db) {
    // Start a transaction
    db.prepare('BEGIN').run();
  
    try {
      // Check if classes already exist
      const classCount = db.prepare('SELECT COUNT(*) as count FROM classes').get().count;
      
      let classIds;
      if (classCount === 0) {
        // Insert Classes
        const classesStmt = db.prepare(`
          INSERT INTO classes (name, description) VALUES (?, ?)
        `);
      
        classIds = [
          classesStmt.run('Mathematics 101', 'Introduction to basic mathematics concepts').lastInsertRowid,
          classesStmt.run('History 101', 'World History overview').lastInsertRowid,
          classesStmt.run('Computer Science 101', 'Introduction to programming').lastInsertRowid
        ];
        console.log('Classes inserted successfully.');
      } else {
        console.log('Classes already exist, skipping insertion.');
        // Fetch existing class IDs
        classIds = db.prepare('SELECT id FROM classes LIMIT 3').all().map(row => row.id);
      }
  
      // Check if users already exist
      const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  
      if (userCount === 0) {
        // Insert Users (Teachers and Students)
        const usersStmt = db.prepare(`
          INSERT INTO users (username, password, role, name, classId) VALUES (?, ?, ?, ?, ?)
        `);
        
        // Teachers
        usersStmt.run('teacher1', '123', 'teacher', 'John Doe', null);
        usersStmt.run('teacher2', '123', 'teacher', 'Jane Smith', null);
      
        // Students
        usersStmt.run('student1', '123', 'student', 'Alice Johnson', classIds[0]);
        usersStmt.run('student2', '123', 'student', 'Bob Williams', classIds[1]);
        usersStmt.run('student3', '123', 'student', 'Charlie Brown', classIds[2]);
        usersStmt.run('student4', '123', 'student', 'Diana Miller', classIds[0]);
  
        console.log('Users inserted successfully.');
      } else {
        console.log('Users already exist, skipping insertion.');
      }
  
      // Commit the transaction
      db.prepare('COMMIT').run();
      console.log('Seed data operation completed successfully.');
    } catch (error) {
      // If there's an error, roll back the transaction
      db.prepare('ROLLBACK').run();
      console.error('Error in seed data operation:', error.message);
    }
  }
  
  function down(db) {
    // Start a transaction
    db.prepare('BEGIN').run();
  
    try {
      // Remove all data from the tables
      db.prepare('DELETE FROM comments').run();
      db.prepare('DELETE FROM questions').run();
      db.prepare('DELETE FROM lectures').run();
      db.prepare('DELETE FROM assignments').run();
      db.prepare('DELETE FROM users').run();
      db.prepare('DELETE FROM classes').run();
      
      // Commit the transaction
      db.prepare('COMMIT').run();
      console.log('Seed data removed successfully.');
    } catch (error) {
      // If there's an error, roll back the transaction
      db.prepare('ROLLBACK').run();
      console.error('Error in removing seed data:', error.message);
    }
  }
  
  module.exports = { up, down };