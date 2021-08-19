const router = require('express').Router();
const axios = require('axios');
const {YOUR_API_KEY} = require('./../db');
const { Videogame, Genero } = require("./../db")



router.get("/", (req, res) => {
const {name} = req.body

let DB = Genero.findAll()
    
    DB.then((respdb) =>{
        if(respdb.length > 0){
           res.send(respdb)
           }
        else{
            let newgenero = []

            let generos = axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)

            generos.then((respapi) => {

                for(let i = 0; i < respapi.data.results.length; i++){
                    newgenero.push(Genero.create({
                     name: respapi.data.results[i].name,
                     }))
                }
                Promise.all(newgenero)
                .then((resp) => {
                    res.send(resp)
                })
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(404).send(err)
    })
})










module.exports= router