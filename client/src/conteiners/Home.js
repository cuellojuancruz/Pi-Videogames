import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getgenres ,totalgames } from '../actions';



export function Home(props){

    const handleClick = function() {
        props.totalgames();
        props.getgenres();
    }

    return(
        <div className="Home">
            <header className = "Home-Header">
            <Link to = {"/games"} > 
                <span onClick={(e) => handleClick(e)} className="Home-Title" >Welcome</span>
            </Link>
            </header>
            <main className= "Home-Main">
                <img src="https://media.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif" alt="" />
                <img src="https://media.giphy.com/media/inBddTTppeDQhI6iie/giphy.gif" alt="" />
            </main>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        totalgames: () => dispatch(totalgames()),
        getgenres: () => dispatch(getgenres())
        }
}



export default connect(null, mapDispatchToProps)(Home);