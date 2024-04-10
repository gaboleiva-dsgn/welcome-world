const express = require("express");
const app = express();
const fs = require('fs').promises

const exphbs = require(handlebars);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
