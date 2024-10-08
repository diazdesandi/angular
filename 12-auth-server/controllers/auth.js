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
      email,
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
const iniciarSesion = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const dbUser = await Usuario.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "Correo no existe",
      });
    }

    // Confirmar contraseña
    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña inválida",
      });
    }

    // JWT Token
    const token = await generarJWT(dbUser.id, dbUser.name);

    // Respuesta del servicio
    return res.json({
      ok: true,
      uid: dbUser.uid,
      name: dbUser.name,
      email: dbUser.email,
      token,
      msg: "Iniciar sesión",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// Validación token
const validarToken = async (req, res = response) => {
  const { uid } = req;

  // Leer base de datos para obtener email
  const dbUser = await Usuario.findById(uid);

  const token = await generarJWT(uid, dbUser.name); // Revalidar token

  return res.json({
    ok: true,
    msg: "Token renovar",
    uid,
    name: dbUser.name,
    email: dbUser.email,
    token,
  });
};

module.exports = {
  crearUsuario,
  iniciarSesion,
  validarToken,
};
