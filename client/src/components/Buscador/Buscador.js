import { useEffect, useState } from "react"
import {searchgamebyname, getgames} from "../../actions"
import { connect } from 'react-redux';
import './Search.css';



export function Buscador({searchgamebyname, getgames}){

    useEffect(() => {
        getgames()
    }, [getgames])

    const initialState = {name: ""}
  
    const [datos, setDatos] = useState(initialState)



    const handleChange = function(e) {
        setDatos({ name: e.target.value });
      }

      const handleClick = function(e) {
        searchgamebyname(name);
      }

  const {name} = datos




    return(
        <div style={{display:"flex"}}>
            <button className="Search" onClick={(e) => handleClick(e)}>Search</button>
            <input className="Input" type="Text"
            id="name"
            autoComplete="off"
            value={name} 
            placeholder="Games" 
            onChange={(e) => handleChange(e)}
            />
        </div>
    )
}


function mapStateToProps(state) {
    return {
        games: state.gamesloaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchgamebyname: (name) => dispatch(searchgamebyname(name)),
        getgames: () => dispatch(getgames())}
}



export default connect(mapStateToProps, mapDispatchToProps)(Buscador);