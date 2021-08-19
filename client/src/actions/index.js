import axios from 'axios';




export function searchgamebyname (name) {
    return function (dispatch) {
        dispatch({type: "searching"})
        axios.get(`http://localhost:3001/videogames?name=${name}`)
        .then((res) => {
            dispatch({
                type: "searchgamebyname",
                payload: res.data
            })
        })
    }
}

export function filtergenres (payload) {
    return {type: "filtergenres", payload: payload}
}

export function getgames () {
    return function (dispatch) {
        dispatch({type: "searching"})
        axios.get(`http://localhost:3001/videogames/`)
        .then((res) => {
            dispatch({
                type: "getgames",
                payload: res.data
            })
        })
    }
}

export function getgenres () {
    return function (dispatch) {
        axios.get(`http://localhost:3001/genero/`)
        .then((res) => {
            dispatch({
                type: "getgenres",
                payload: res.data
            })
        })
    }
}

export function totalgames () {
    return function (dispatch) {
        axios.get(`http://localhost:3001/videogames/`)
        .then((res) => {
            dispatch({
                type: "totalgames",
                payload: res.data
            })
        })
    }
}

export function orderName (payload) {
    return {type: "orderName", payload: payload}
}

export function orderRating (payload) {
    return {type: "orderRating", payload: payload}
}

export function getdetailgame (id) {
    console.log("entro a la action", id)
    return function (dispatch) {
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then((res) => {
            console.log("promesa terminada",res.data)
            dispatch({
                type: "detailgame",
                payload: res.data
            })
        })
    }
}

export function creategames (datos) {
    return function (dispatch) {
        axios.post(`http://localhost:3001/videogame/`, {datos})
        .then((res) => {
            dispatch({
                type: "creategame",
                payload: res.data
            })
        })
    }
}


export function paginado (numero) {
    return {type: "paginado", payload: numero}
}