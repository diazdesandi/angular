const express = require("express");

// Crear servidor/aplicación de Express
const app = express();

// GET
app.get("/", (req, res) => {
  res.status(404).json({
    ok: true,
    msg: "Todo salio bien",
    uid: 1234,
  });
});

app.listen(4000, () => {
  console.log(`Servidor en puerto ${4000}`);
});
