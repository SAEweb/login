const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const loginRoutes = require('./api/login');  // no necesitas .js aquí

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'clave-secreta',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(__dirname));

app.use('/api/login', loginRoutes);

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

app.get('/dashboard.html', (req, res) => {
  if (req.session.user) {
    return res.sendFile(path.join(__dirname, 'dashboard.html'));
  } else {
    return res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });