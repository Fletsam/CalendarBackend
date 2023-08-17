const {
  getEventos,
  crearEvento,
  actualizarEventos,
  eliminarEventos,
} = require("../controllers/events");
const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const router = Router();
router.use(validarJWT);
//obtener eventos
router.get("/", getEventos);
//Crear eventos
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es Obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es Obligatoria").custom(isDate),

    validarCampos,
  ],
  crearEvento
);

//actualizar eventos
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es Obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es Obligatoria").custom(isDate),

    validarCampos,
  ],
  actualizarEventos
);

//borrar eventos
router.delete("/:id", eliminarEventos);

module.exports = router;
