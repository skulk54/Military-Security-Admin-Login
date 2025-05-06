// app.js
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
app.use(express.json());

// Store hashed password (e.g., hash of "adminpass")
const admins = {
  "admin": "$2b$10$eU8AmG5lOSNkxe3n5bxOZud2CwEC3ItNEqz72HZusQ4oIYgYAEDAS" // password: adminpass
};

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Admin Login</title>
      <style>
        body { font-family: Arial; background: #111; color: #eee; display: flex; justify-content: center; align-items: center; height: 100vh; }
        form { background: #222; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px lime; }
        input { display: block; margin-bottom: 10px; padding: 8px; width: 100%; }
        button { padding: 10px; background: lime; border: none; cursor: pointer; width: 100%; }
      </style>
    </head>
    <body>
      <form id="loginForm">
        <h2>Admin Login</h2>
        <input type="text" id="username" placeholder="Username" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p id="status"></p>
      </form>

      <script>
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;

          const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });

          const result = await res.json();
          document.getElementById('status').textContent = result.message;
        });
      </script>
    </body>
    </html>
  `);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const hash = admins[username];
  if (!hash) return res.status(401).json({ message: 'Unauthorized: invalid user' });

  const match = await bcrypt.compare(password, hash);
  if (match) {
    res.json({ message: 'Access granted' });
  } else {
    res.status(401).json({ message: 'Unauthorized: invalid password' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
