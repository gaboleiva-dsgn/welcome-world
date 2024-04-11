const express = require("express");
const app = express();
const fs = require("fs").promises

//const exphbs = require("handlebars");

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
// Vamos a utilizar levantar el index.html desde el servidor cuando se visite la ruta raíz
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta
// recibida
app.get("/crear", async (req, res) => {
    const {archivo, contenido} = req.query;
    console.log("Este es el archivo:", archivo);
    console.log("Este es el contenido:", contenido);
    try {
        await fs.writeFile(archivo, contenido);
        res.send(`El archivo ${archivo} se ha creado con éxito!!`);
    } catch (error) {
        res.status(500).send("Ocurrio un error al crear el archivo");
    }
});

// Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es
// declarado en los parámetros de la consulta recibida
app.get("/leer", async (req, res) => {
    const { archivo } = req.query;
    try {
        await fs.readFile(archivo);
        res.sendFile(__dirname + "/" + archivo);
    } catch (error) {
        res.status(500).send(`No se puede mostrar el archivo ${archivo}`);
    }
});

// Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es
// declarado en los parámetros de la consulta recibida
app.get("/renombrar", async (req, res) => {
    const {nombre, nuevoNombre} = req.query;
    try {
        await fs.rename(nombre, nuevoNombre);
        res.send(`El archivo ${nombre} se ha renombrado como ${nuevoNombre}`);
    } catch (error) {
        res.status(500).send(`No se ha logrado renombrar el archivo ${nombre}`);
    }
});

// Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los
// parámetros de la consulta recibida
app.get("/eliminar", async (req, res) => {
    const {archivo} = req.query;
    try {
        await fs.unlink(archivo);
        res.send(`El archivo ${archivo} se ha eliminado con exito`);
    } catch (error) {
        // Tipificar errores
        res.status(500).send(`El archivo ${archivo} no se ha eliminado`);
    }
});