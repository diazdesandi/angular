const { response } = require("express");
const { validationResult } = require("express-validator");

// Crear usuario
const crearUsuario = (req, res = response) => {
  // console.log(req.body);

  const { email, name, password } = req.body;
  console.log(email, name, password);

  return res.json({
    ok: true,
    msg: "Crear usuario",
  });
};

// Iniciar sesión
const iniciarSesion = (req, res = response) => {
  const { email, password } = req.body;
  console.log(email, password);
  return res.json({ ok: true, msg: "Inicio de sesión" });
};

// Validación token
const validarToken = (req, res = response) => {
  return res.json({ ok: true, msg: "renew tkn" });
};

module.exports = {
  crearUsuario,
  iniciarSesion,
  validarToken,
};
