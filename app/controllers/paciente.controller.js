const Paciente = require("../models/paciente.model.js");

// Create and Save a new patient
exports.create = (req, res) => {
  // Validate request, sorry for the manual validation haha
  console.log('Req body: ', req.body);
  if (!req.body.nombre || !req.body.apellido || !req.body.fecha_nacimiento) {
    res.status(400).send({
      message: "Por favor, complete todos los campos"
    });
    return
  }
  // Create paciente
  const paciente = new Paciente({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecha_nacimiento: req.body.fecha_nacimiento,
  });
  Paciente.create(paciente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error creando el registro"
      });
    else res.send({
      data,
      success: true
    });
  });
};

exports.findAll = (req, res) => {
  Paciente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error trayendo los registros.."
      });
    else res.send(data);
  });
};

exports.findByCodigo = (req, res) => {
  Paciente.findByCodigo(req.params.codigo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Paciente with codigo ${req.params.codigo}.`
        });
      } else {
        res.status(500).send({
          message: "Could not find Paciente with codigo " + req.params.codigo
        });
      }
    } else res.send({
      success: true,
      data
    });
  });
};

exports.updateByCodigo = (req, res) => {
  console.log('Body Paciente: ', req.body);
  // Validate Request
  if (req.body === {} || req.body === null) {
    console.log('No body');
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return
  }
  Paciente.updateByCodigo(req.params.codigo, new Paciente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Paciente with codigo ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Paciente with codigo " + req.params.id
          });
        }
      } else res.send({
        succes: true,
        data
      });
    }
  );
};

exports.delete = (req, res) => {
  Paciente.remove(req.params.codigo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Paciente with codigo ${req.params.codigo}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Paciente with codigo " + req.params.codigo
        });
      }
    } else res.send({ message: `Paciente was deleted successfully!` });
  });
};