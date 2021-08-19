const initialState = {
    gamesdetail: {},
    gamesloaded: [],
    gamestotal: [],
    gamesgenres: [],
    searching: false,
    paginado: 1
}



function reducer (state = initialState, action){

    if(action.type === "searching"){
        return {
            ...state,
            searching: true
        }
    }

    if(action.type === "paginado"){
        return {
            ...state,
            paginado: action.payload
        }
    }


    if (action.type === "searchgamebyname") {
        return {
            ...state,
            gamesloaded: action.payload,
            searching: false,
            paginado: 1
        }
    }

    if(action.type === "getgames"){
        return{
            ...state,
            gamesloaded: action.payload,
            searching: false,
            paginado: 1
        }

    }

    if(action.type === "getgenres"){
        return{
            ...state,
            gamesgenres: action.payload,
            paginado: 1
        }
    }

    if(action.type === "totalgames"){
        return{
            ...state,
            gamestotal: action.payload,
            paginado: 1
        }

    }

    if(action.type === "filtergenres"){
        return{
            ...state,
            gamesloaded: state.gamestotal.filter(game => {
                if(game.db){
                    for (let i = 0; i < game.generos.length; i++) {
                        if(game.generos[i].name.toLowerCase() === action.payload.toLowerCase()){
                            return true
                        }
                    }
                }
                else{
                    for (let i = 0; i < game.genres.length; i++) {
                        if(game.genres[i].name.toLowerCase() === action.payload.toLowerCase()){
                            return true
                        }
                    }
                }
                return false
            }),
            searching: false,
            paginado: 1
        }
    }

    if(action.type === "orderName"){
        return {
            ...state,
            gamesloaded: [].concat(state.gamesloaded.sort((nombre1 ,nombre2) => {
                if(action.payload === "Asc"){
                    if(nombre1.name.toLowerCase() > nombre2.name.toLowerCase()){
                        return 1
                    }
                    else{
                        return -1
                    }
                }
                else{
                    if(nombre1.name.toLowerCase() > nombre2.name.toLowerCase()){
                        return -1
                    }
                    else{
                        return 1
                    }
                }
            })),
            paginado: 1
        }
    }

    if(action.type === "orderRating"){
        return {
            ...state,
            gamesloaded: [].concat(state.gamesloaded.sort((numero1 ,numero2) => {
                if(action.payload === "Asc"){
                    if(numero1.rating > numero2.rating){
                        return 1
                    }
                    else{
                        return -1
                    }
                }
                else{
                            if(numero1.rating > numero2.rating){
                                return -1
                            }
                            else{
                                return 1
                            }
                }
            })),
            paginado: 1
        }
    }

    if(action.type === "detailgame"){
        return {
            ...state,
            gamesdetail: action.payload,
            paginado: 1
        }
    }
    return state;
}



export default reducer;