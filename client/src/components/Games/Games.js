import NavBar from "./../NavBar/NavBar";
import { getdetailgame, getgames,} from "../../actions/index";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import  Paginate  from "../paginado/Paginado.jsx";
import { useDispatch, useSelector } from "react-redux";
import './Games.css';

export function Games() {
    
    const dispatch = useDispatch()

    const items = 9
    const games = useSelector((state) => state.gamesloaded)
    const searching = useSelector((state) => state.searching)
    const [corte , setCorte] = useState([0, 9])

    useEffect(() => {
        dispatch(getgames())
    }, [dispatch])

    useEffect(() => {
        handlePaginado(1)        
    }, [games])

    const handleClick = function(id){
        dispatch(getdetailgame(id))
    }

    function handlePaginado(pageNumber) {
        setCorte([(pageNumber - 1) * items, pageNumber * items])
      }


    return (
        <div className="Games">
            <header>
                <NavBar></NavBar>
            </header>
            <div className= "Cards">
                {
                searching
                ?
                <img className="Loading" src="https://external-preview.redd.it/r5smAYDxGjI9piqoskEFaCpUacfzhNr413YMhnZ1lBo.gif?s=6b79929495ab5f44cfd33bc5b59ce7810185cc72" alt="loading" />
                :
                    games.length > 0
                    ?
                    <>
                        {games.slice(corte[0], corte[1]).map(game => {
                            return (
                                <div className="Card" key={game.id}>
                                    <Link to= "/Detail" onClick = {() => handleClick(game.id)}>
                                        <h2 className="Name-Game">{game.name}</h2>
                                    </Link>
                                    <h3 className="Genres-Games">
                                        {
                                        game.db
                                        ?
                                        game.generos.map((gen, index) => {
                                            return <span key={index}>{gen.name}</span>
                                        })
                                        :
                                        game.genres.map((gen, index) =>{
                                            return <span key={index}>{gen.name}</span>
                                        })
                                        }                            
                                    </h3>
                                    <img className="IMG-Game" src={game.background_image} width="400" height="150" alt= "Not found"/>
                                </div>
                            )
                        })}
                    </>
                    :
                    <h1 className="NoGames">Oh Oh No se a encontrado ningun juego</h1>
                }
            </div>
                <footer className="Footer">
                    <Paginate items={items} handlePaginado={handlePaginado} games= {games}/>
                </footer>
        </div>
    )




}




export default (Games);