const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

// Crear usuario
const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body;

  // Verificar email
  try {
    let usuario = await Usuario.findOne({ email: email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Correo ya registrado",
      });
    }

    // Crear usuario modelo
    const dbUser = new Usuario(req.body);

    // Hash contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // JWT
    const token = await generarJWT(dbUser.id, name);

    // Crear usuario db
    dbUser.save();

    // Respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
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
