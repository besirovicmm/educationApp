const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'myapp.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Check if the database file already exists
const dbExists = fs.existsSync(dbPath);

if (dbExists) {
  console.log('Database file exists. Checking for tables...');

  // Check if any tables exist in the database
  const tableCount = db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").get().count;

  if (tableCount === 0) {
    console.log('No tables found. Running initial migration...');
    // If no tables exist, run the schema migration
    const schemaMigration = require('./migrations/initial_migration');
    schemaMigration.up(db);
    console.log('Database schema created successfully.');
  } else {
    console.log('Tables already exist. Skipping initial migration.');
  }

  // Check if users table is empty
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;

  if (userCount === 0) {
    console.log('No users found. Running seed migration...');
    // If the users table is empty, run the seed migration
    const seedMigration = require('./migrations/initial_seed');
    seedMigration.up(db);
    console.log('Seed data inserted successfully.');
  } else {
    console.log('Users already exist. Skipping seed migration.');
  }
} else {
  console.log('Database file does not exist. It will be created when the first query is run.');
}

module.exports = db;