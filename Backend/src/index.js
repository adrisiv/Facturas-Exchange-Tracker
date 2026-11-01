const express = require('express');
const app = express();
const port = 3000;

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola desde mi backend con Node.js y Express!');
});

// Poner a escuchar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
