const router = require('express').Router();
const { Videogame, Genero } = require("./../db")
const axios = require('axios');
const {YOUR_API_KEY} = require('./../db');
const { Op } = require('sequelize');

let detalle = (id) => `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
                //     https://api.rawg.io/api/games/50?key=2580ce6b461f4696bcef187b8946e06e

router.get("/:idVideogame", (req, res) => {
const {idVideogame} = req.params
const {DB} = req.query

    if(DB === "true"){
        const resultDB = Videogame.findOne({
            where: {
                id: idgame
            },
            include: [{
                model: Genero
            }]
        })
        resultDB.then((resp) => {
            res.send(resp);
        })
        .catch((err) => {
            console.log(err)
            res.status(404).send(err)
        })
    }
    else{
        axios.get(detalle(idVideogame))
        .then((resp) => {
            res.send(resp.data);
        })
        .catch((err) => {
            res.status(404).send(err);
        })
    }
})


router.post("/", (req, res) => {
    console.log(req.body,"entro al endpoint")
    const {name, descripcion, fechadelanzamiento, rating, plataformas, genres} = req.body

    var newgame = Videogame.create({
        name,
        descripcion,
        fechadelanzamiento,
        rating,
        plataformas,
    })

    var genre = []

    for (let pos of genres){
        genre.push(Genero.findOne({
            where: {
                    name: {
                        [Op.iLike]: `%${pos}%`
                    }
            }
        }))
    }


    Promise.all([newgame].concat(genre))
    .then(resp => {
        return resp[0].addGeneros(resp.slice(1))
    })
    .then(() => {
        res.status(200)
    })
})







module.exports= router




// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
// Ruta de detalle de videojuego: debe contener

// [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas