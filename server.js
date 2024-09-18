const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const usersFile = path.join(__dirname, 'users.json');

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());

// Serve login.html when visiting root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Register User
app.post('/register', (req, res) => {
  const { name, lastName, email, username, password } = req.body;

  if (!name || !lastName || !email || !username || !password) {
    return res.json({ message: 'error1' });
  }

  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);
    const userExists = users.find(user => user.username === username || user.password === password);

    if (userExists) {
      return res.json({ message: 'error1' });
    }

    users.push({ name, lastName, email, username, password });
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) throw err;
      res.json({ message: 'register' });
    });
  });
});

// Login User
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      return res.json({ message: 'login' });
    } else {
      return res.json({ message: 'error2' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
