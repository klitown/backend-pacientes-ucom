const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://127.0.0.1:5500"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Ruta INDEX del servidor" });
});

require("./app/routes/paciente.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
