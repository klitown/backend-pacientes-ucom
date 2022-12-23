module.exports = app => {
  const paciente = require("../controllers/paciente.controller.js");
  const signosVitales = require("../controllers/signos-vitales.controller.js");

  var router = require("express").Router();

  // Post a "/" -> crea un nuevo registro
  router.post("/", paciente.create);

  // Get "/" -> trae todos los registros
  router.get("/", paciente.findAll);

  // Get "/:codigo" -> busca un paciente por código
  router.get("/:codigo", paciente.findByCodigo);

  // Put "/:codigo" -> editar un paciente por código
  router.put("/:codigo", paciente.updateByCodigo);

  // Delete "/:codigo" -> borra un paciente por codigo
  router.delete("/:codigo", paciente.delete);

  /**
   * 
   * RUTAS PARA SIGNOS VITALES
   * 
   */
  // Post a "/" -> crea un nuevo registro
  router.post("/signosVitales", signosVitales.create);

  // Get "/:codigo_paciente" -> busca signos por código paciente
  router.get("/signosVitales/:codigo_paciente", signosVitales.findByCodigoPaciente);

  // Put "/:id" -> editar un signo vital por id
  router.put("/signosVitales/:id", signosVitales.updateById);

  // Delete "/:id" -> borra un signo vital por id
  router.delete("/signosVitales/:id", signosVitales.delete);


  app.use('/api/pacientes', router);
};
