const express = require('express');
const router = express.Router();

// Base de datos simulada
const usuarios = [
  { usuario: 'admin', password: 'admin' },
  { usuario: 'sae', password: '123' }
];

router.post('/', (req, res) => {
  console.log('💡 Login attempt body:', req.body);
  const { usuario, password } = req.body;

  const user = usuarios.find(
    u => u.usuario === usuario && u.password === password
  );

  if (user) {
    req.session.user = user;
    return res.redirect('/dashboard.html');
  } else {
    return res.status(401).send('Credenciales inválidas');
  }
});

module.exports = router;