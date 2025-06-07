const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
const DB_FILE = path.join(DATA_DIR, 'events.db');
const dbExists = fs.existsSync(DB_FILE);
const db = new sqlite3.Database(DB_FILE);

if (!dbExists) {
  db.serialize(() => {
    db.run(`CREATE TABLE events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      datetime TEXT NOT NULL,
      bgColor TEXT
    )`);
  });
} else {
  // ensure new column exists
  db.run('ALTER TABLE events ADD COLUMN bgColor TEXT', err => {
    if (err && !/duplicate column/.test(err.message)) {
      console.error('Error ensuring bgColor column', err);
    }
  });
}

const app = express();
app.use(cors());
app.use(express.json());

// API to create event
app.post('/api/events', (req, res) => {
  const { title, description, datetime, bgColor } = req.body;
  if (!title || !datetime) return res.status(400).json({ error: 'title and datetime required' });
  const id = Math.random().toString(36).substring(2, 8);
  const stmt = db.prepare('INSERT INTO events (id, title, description, datetime, bgColor) VALUES (?, ?, ?, ?, ?)');
  stmt.run(id, title, description || '', datetime, bgColor || null, function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'db error' });
    }
    res.json({ id, url: `/event/${id}` });
  });
});

// API to get event
app.get('/api/events/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM events WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'db error' });
    }
    if (!row) return res.status(404).json({ error: 'not found' });
    res.json(row);
  });
});

// Serve static files from frontend
const buildPath = path.join(__dirname, 'client');
app.use(express.static(buildPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on', PORT);
});
