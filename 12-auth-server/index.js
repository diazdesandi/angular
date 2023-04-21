require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { dbConnection } = require("./db/config");

// console.log(process.env);

// Crear servidor/aplicación de Express
const app = express();

// dbConnection
dbConnection();

// Directorio público
app.use(express.static("public"));

// Lectura y parse de body
app.use(express.json());

// CORS
// Se puede agregar dominio para que sea más seguro.
app.use(cors());

// Rutas
app.use("/api/auth", require("./routes/auth"));

// Manejador de rutas
app.get("*", (req, resp) => {
  resp.sendFile(path.resolve(__dirname, "public/index.html"));
});

// process.env.PORT hace referencia a .env PORT=4000
app.listen(process.env.PORT, () => {
  console.log(`Servidor en puerto ${process.env.PORT}`);
});
