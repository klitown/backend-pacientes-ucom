const sql = require("./db.js");


// constructor
const Paciente = function (paciente) {
  this.nombre = paciente.nombre;
  this.apellido = paciente.apellido;
  this.fecha_nacimiento = paciente.fecha_nacimiento;
};

Paciente.create = (newPatient, result) => {
  console.log('Nuevo paciente data: ', newPatient);
  sql.query("INSERT INTO paciente SET ?", newPatient, (err, res) => {
    if (err) {
      console.log("error aca: ", err);
      result(err, null);
      return;
    }

    console.log("created patient: ", { id: res.insertId, ...newPatient });
    result(null, { id: res.insertId, ...newPatient });
  });
};

Paciente.getAll = (result) => {
  let query = "SELECT * FROM paciente";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("paciente: ", res);
    result(null, res);
  });
};

Paciente.findByCodigo = (codigo, result) => {
  sql.query(`SELECT * FROM paciente WHERE codigo = ${codigo}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Paciente encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Paciente.updateByCodigo = (codigo, paciente, result) => {
  sql.query(
    "UPDATE paciente SET nombre = ?, apellido = ?, fecha_nacimiento = ? WHERE codigo = ?",
    [paciente.nombre, paciente.apellido, paciente.fecha_nacimiento, codigo],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Paciente with the codigo
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Updated paciente: ", { codigo: codigo, ...paciente });
      result(null, { codigo: codigo, ...paciente });
    }
  );
};

Paciente.remove = (codigo, result) => {
  sql.query(`DELETE FROM paciente WHERE codigo = ${codigo}`, codigo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted paciente with codigo: ", codigo);
    result(null, res);
  });
};

module.exports = Paciente;