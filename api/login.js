// api/login.js
const express = require("express");
const router = express.Router();

// Base de datos simulada
const usuarios = [
  { usuario: "admin", password: "1234" },
  { usuario: "juan", password: "abcd" },
];

router.post("/", (req, res) => {
  const { usuario, password } = req.body;
  const user = usuarios.find(
    (u) => u.usuario === usuario && u.password === password
  );

  if (user) {
    req.session.user = user;
    return res.redirect("/dashboard.html");  // Redirige al dashboard
  } else {
    return res.status(401).send("Credenciales inválidas");
  }
});

module.exports = router;