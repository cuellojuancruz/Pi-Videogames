const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require("./videogames")
const genero = require("./genero")
const videogame = require("./videogame")

const router = Router();

// server.use(express.json());
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames);
router.use("/genero", genero);
router.use("/videogame", videogame)


router.get("/error", (req, res) => {
    res.status(404);
    res.send("No se encontro dicha ruta")
})

module.exports = router;
