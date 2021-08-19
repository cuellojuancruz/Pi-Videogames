import Buscador from "./../Buscador/Buscador";
import { connect } from 'react-redux';
import { filtergenres, orderName, orderRating, getgames } from "../../actions";
import { Link } from 'react-router-dom';
import './NavBar.css';


export function NavBar(props){


    const handleChange = function(e){
        props.orderName(e.target.value)
    }

    const handleAll = function(e){
        props.getgames()
    }

    const RatingChange = function(e){
        props.orderRating(e.target.value)
    }

    const handleGenres = function (e){
        props.filtergenres(e.target.value)
    }
    

    return(
        <div className="NavBar">
            <Link to= "/">
                <button className="Button">Home</button>
            </Link>
            <button className="Button" onClick={(e) => handleAll(e)}>All</button>
            <select className="Select" name="order" id="1" onChange={(e) => handleChange(e)}>
                <option hidden value>Alphabetically</option>
                <option value = "Desc">Desc</option>
                <option value = "Asc">Asc</option>
            </select>
            <select className="Select" name="Rating" id="2" onChange={(e) => RatingChange(e)}>
                <option hidden value>Rating</option>
                <option value="Desc">Desc</option>
                <option value="Asc">Asc</option>
            </select>
            <select className="Select" name="Genres" id="3" onChange={(e) => handleGenres(e)}>
                <option hidden value="Genres">Genres</option>
                { props.Genres.map(g => {
                    return (
                        <option value={g.name}key={g.id}>{g.name}</option>
                    )
                })}
            </select>
            <Link to = "CreateGames">
            <button className="Button">Create Games</button>
            </Link>
            <Buscador></Buscador>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        orderName: (e) => dispatch(orderName(e)),
        orderRating: (e) => dispatch(orderRating(e)),
        filtergenres: (e) => dispatch(filtergenres(e)),
        getgames: () => dispatch(getgames())
    }
}

function mapStateToProps(state) {
    return {
        Games: state.gamesloaded,
        Genres: state.gamesgenres
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);











