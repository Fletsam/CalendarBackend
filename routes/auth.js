/* Rutas del usuario / auth 
					host + /api/auth */

const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
router.post(
  "/new",
  [
    //Middlewares
    check("name", "El nombre es Obligatorio").not().isEmpty(),
    check("email", "El email es Obligatorio").isEmail(),
    check("password", "El password debe de ser 6 characteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);
router.post(
  "/",
  [
    //Middlewares
    check("email", "El email es Obligatorio").isEmail(),
    check("password", "El password debe de ser 6 characteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
