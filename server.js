const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const loginRoutes = require('./api/login.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'clave-secreta',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(__dirname));

app.use('/api/login.js', loginRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/user', (req, res) => {
    if (req.session.user) {
      return res.json({ usuario: req.session.user.usuario });
    } else {
      return res.status(401).json({ error: 'No autorizado' });
    }
  });

app.get("/dashboard.html", (req, res) => {
    if (req.session.user) {
      res.sendFile(path.join(__dirname, "dashboard.html"));
    } else {
      res.redirect("/");  // Si no está logueado, lo redirige al login
    }
  });  

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});