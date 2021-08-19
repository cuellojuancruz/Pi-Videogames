const router = require('express').Router();
const axios = require('axios');
const {YOUR_API_KEY} = require('./../db');
const { Videogame, Genero } = require("./../db")
const { Op } = require('sequelize');
let filteredgames = []






router.get("/", (req, res) => {
    const {name} = req.query
    let database;
    let api
    

    if(!name){

        let promesas = []

        for(let i = 1; i <= 5; i++){
            promesas.push(axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${[i]}` ))
        }
        api=promesas

        database = Videogame.findAll({
            include: [{
                 model: Genero}]
        })
    }

    else{

        api = axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)

        database = Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [{
                 model: Genero}]
        })
    }

    var promises

    if(Array.isArray(api)){
        promises = [database, ...api]
    }
    else{
        promises = [database, api]
    }

    Promise.all(promises)
    .then((result) => {
        const resultDB = result[0];
        var filtreadoapi = []
        for (let i = 1; i < result.length; i++) {
    
            if(!name){
                filtreadoapi = [...filtreadoapi, ...result[i].data.results];
            }
            else{
                var filt = result[i].data.results.filter(g => {
                    return g.name.toLowerCase().includes(name.toLowerCase())
                });
                filtreadoapi = [...filtreadoapi, ...filt] 
            }
        }

        filteredgames = resultDB.concat(filtreadoapi)
        return res.status(200).send(filteredgames)
    })

    .catch((err) => {
        console.log(err);
        return res.send(400);
    })
})


router.get("/platforms", (req, res) => {
    console.log("endpoint")
    axios.get(`https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`)
    .then((resp) => {
        console.log(".then",resp.data)
        res.status(200).send(resp.data)
    })
})




module.exports= router