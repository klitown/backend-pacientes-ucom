const sql = require("./db.js");

// constructor
const SignosVitales = function (signosVitales) {
    this.fecha = signosVitales.fecha;
    this.frecuencia = signosVitales.frecuencia;
    this.presion = signosVitales.presion;
    this.codigo_paciente = signosVitales.codigo_paciente;
};

SignosVitales.create = (signosVitales, result) => {
    sql.query("INSERT INTO signos_vitales SET ?", signosVitales,
        (err, res) => {
            if (err) {
                console.log("error aca: ", err.sqlMessage);
                result(err, null);
                return;
            }

            console.log("created signos vitales: ", { id: res.insertId, ...signosVitales });
            result(null, { id: res.insertId, ...signosVitales });
        });
};


SignosVitales.findByCodigoPaciente = (codigoPaciente, result) => {
    sql.query(`SELECT * FROM signos_vitales WHERE codigo_paciente = ${codigoPaciente}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Signos vitales encontrado: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

SignosVitales.updateById = (id, signoVital, result) => {
    sql.query(
        "UPDATE signos_vitales SET fecha = ?, frecuencia = ?, presion = ? WHERE id = ?",
        [signoVital.fecha, signoVital.frecuencia, signoVital.presion, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found SignosVitales with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("Updated SignosVitales: ", { id: id, ...signoVital });
            result(null, { id: id, ...signoVital });
        }
    );
};

SignosVitales.remove = (id, result) => {
    sql.query(`DELETE FROM signos_vitales WHERE id = ${id}`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted signo vital with id: ", id);
        result(null, res);
    });
};

module.exports = SignosVitales;