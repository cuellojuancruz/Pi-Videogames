import axios from "axios"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getdetailgame, creategames } from "../../actions"
import './CreateGames.css';



export function CreateGame(props){

    const [platforms, setPlatforms] = useState([])

    const initialState = {name: "", fechadelanzamiento: "", rating: "", descripcion: "", plataformas: "", genres: []}
  
    const [datos, setDatos] = useState(initialState)

    const {name, fechadelanzamiento, rating, descripcion, plataformas} = datos

    useEffect(() => {
        axios.get(`http://localhost:3001/videogames/platforms/`)
        .then((resp) => {
            setPlatforms(resp.data.results.map(p => {
                return(
                    p.name
                )
            }))
        })
    }, [])


    const handleName = function(e) {
        setDatos({ 
            ...datos, 
            name: e.target.value });
      }

      const handlefechadelanzamiento = function(e) {
        setDatos({ 
            ...datos, 
            fechadelanzamiento: e.target.value });
      }

      const handlerating = function(e) {
        setDatos({ 
            ...datos, 
            rating: e.target.value });
      }

      const handledescripcion = function(e) {
        setDatos({ 
            ...datos, 
            descripcion: e.target.value });
      }

      const handleGenres = function (e){
        let arr = []  
        let gen = document.getElementById("genres").selectedOptions
        for(let i =0; i< gen.length; i++){
            arr.push(gen[i].value)
        }

        setDatos({
            ...datos, 
            genres: arr
        })
        }

    const handleplataformas = function (e){
        setDatos({
            ...datos, 
            plataformas: e.target.value})
    }



    const handlesubmit = function(e){
        axios.post(`http://localhost:3001/videogame/`, datos)
        alert("Successful create Video Game")
        setDatos(initialState)
    }


    return(
<div className="CreateGames">

        <Link to= "/games">
        <button className="Button">Games</button>
        </Link>

    <div className="Create">




        <select className="Platform" name= "plataformas" value={plataformas} onChange={(e) => handleplataformas(e)}> 
            <option hidden value>Platforms</option>

            {platforms?.map((g, index) => {
                return(
                    <option key= {index}>{g}</option>
                )
                    }
            )}

        </select>






            <select className="Genres" name="genres" id="genres" onChange={(e) => handleGenres(e)} multiple="multiple">
            
                <option value="Genres">Genres</option>
                    {props.Genres.map(g => {
                        return(
                            <option value={g.name}key={g.id}>{g.name}</option>
                )})}
            </select >



        <span className="inf">Name</span>
            
            <input
            type = "text" 
            name = "name" 
            id = "" 
            value = {name}
            onChange={(e) => handleName(e)}
            />

        <span className="inf">Release</span>
            
            <input 
            type = "date" 
            name = "fechadelanzamiento" 
            id = "" 
            value = {fechadelanzamiento}
            onChange={(e) => handlefechadelanzamiento(e)}
            />

        <span className="inf">Rating</span>
            
            <input 
            type = "number" 
            name = "rating" 
            id = "" 
            value = {rating}
            onChange={(e) => handlerating(e)}
            />

        <span className="inf">Description</span>
            
            <textarea 
            name = "descripcion" 
            id = "" 
            cols = "30" 
            rows = "10"
            value = {descripcion}
            onChange={(e) => handledescripcion(e)}
            ></textarea>

            <button className="Submit" onClick={(e) => handlesubmit(e)}>submit</button>

    </div>

</div>
    )
}





function mapStateToProps(state) {
    return {
        Games: state.gamesloaded,
        Genres: state.gamesgenres
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getdetailgame: (id) => dispatch(getdetailgame(id)),
        creategames: (e) => dispatch(creategames(e))
    }
}



export default connect(mapStateToProps, mapDispatchToProps) (CreateGame)