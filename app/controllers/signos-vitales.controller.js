const SignosVitales = require("../models/signos-vitales.model.js");

exports.create = (req, res) => {
    // Validate request
    console.log('Req body: ', req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Por favor, complete todos los campos"
        });
        return
    }
    const signosVitales = new SignosVitales({
        fecha: req.body.fecha,
        frecuencia: req.body.frecuencia,
        presion: req.body.presion,
        codigo_paciente: req.body.codigo_paciente,
    });
    SignosVitales.create(signosVitales, (err, data) => {
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

exports.findByCodigoPaciente = (req, res) => {
    SignosVitales.findByCodigoPaciente(req.params.codigo_paciente, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SignosVitales with codigo_paciente ${req.params.codigo_paciente}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not find SignosVitales with codigo_paciente " + req.params.codigo_paciente
                });
            }
        } else res.send({
            success: true,
            data
        });
    });
};

exports.updateById = (req, res) => {
    console.log('Body Signos vitales: ', req.body);
    // Validate Request
    if (!req.body) {
        console.log('No body');
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    SignosVitales.updateById(req.params.id, new SignosVitales(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found SignosVitales with updateById ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating SignosVitales with updateById " + req.params.id
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
    SignosVitales.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SignoVital with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete SignoVital with id " + req.params.id
                });
            }
        } else res.send({ message: `Signo vital was deleted successfully!` });
    });
};