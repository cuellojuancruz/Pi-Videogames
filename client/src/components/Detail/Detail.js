import { connect } from 'react-redux';
import { getgenres, totalgames } from '../../actions';
import { Link } from "react-router-dom"
import './Detail.css';

export function Detail(props) {
    return (
        <div className="Todo">
            <>
                <Link to="/games">
                    <button className="Button">Games</button>
                </Link>
                {
                    props.games
                        ?
                        <div className="Detail">
                            <div className="NameReleased">
                                <h1>{props.games.name}</h1>
                                <h2>{props.games.released}</h2>
                                <h2>{props.games.rating}</h2>
                            </div>
                            <div className="GenresPlatform">
                                <h1>{props.games.genres?.map((gen, index) => {
                                    return <span key={index}>{gen.name}</span>
                                })}</h1>
                                <div>{props.games.platforms?.map((p, index) => {
                                    return (
                                        <div key={index}>{p.platform.name}</div>
                                    )
                                })}
                                </div>
                            </div>
                            <img className="IMG" src={props.games.background_image} width="600px" height="350" alt="Not found" />
                            <div className="Description">
                            <p dangerouslySetInnerHTML={{ __html: props.games.description }} />
                            </div>
                        </div>
                        :
                        <p>loading</p>
                }
            </>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        games: state.gamesdetail
    }
}


function mapDispatchToProps(dispatch) {
    return {
        totalgames: () => dispatch(totalgames()),
        getgenres: () => dispatch(getgenres())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Detail)