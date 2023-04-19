const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  iniciarSesion,
  validarToken,
  test,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Crear usuario
router.post(
  "/new",
  [
    check("name", "Nombre obligatorio").notEmpty(),
    check("email", "Correo obligatorio").isEmail(),
    check("password", "Contraseña obligatoria").isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

// Iniciar sesión
router.post(
  "/",
  [
    check("email", "Correo obligatorio").isEmail(),
    check("password", "Contraseña obligatoria").isLength({ ming: 6 }),
    validarCampos,
  ],
  iniciarSesion
);

// Validación de Token
router.get("/renew", validarToken);

module.exports = router;
