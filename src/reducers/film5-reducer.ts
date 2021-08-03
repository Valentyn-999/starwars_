import {Dispatch} from 'redux';
import {setAppErrorAC, SetAppErrorActionType} from "./app-reducer";
import {film5API, starShipsAPI} from "../api/api";
import {StarshipType} from "./Types";

//  initState better be =>  starships: null,
//     starshipsInfo: null,
//     starshipsChecked: null

// initialState:  !!!  InitStateType  !!! = { ... } - need to check result
const initialState = {
    // status: '',
    starships: [],
    starshipsInfo: [],
    starshipsChecked: []
}
// typeof? why you deligated work on TS? its not good idea and as i look at you thunk you write data:any. As you use good model for dev, better use
//just for example: 
// starships: null as array<starships> | null
// end etc ... 
// or created some types and and added to single positions and then use typeof 
type InitStateType = typeof initialState

// any is InitStateType... use TS for initState and you will see more errors with y state. 
export const film5Reducer = (state: InitStateType = initialState, action: ActionsType): any => {
    switch (action.type) {
            //get its method API, where you get a DATA. may be SET? API = GET, Actions = SET, think it looks better
        case 'GET_FILM5': {
            return {
                ...state,
                data: action.data
            }
        }
        case 'GET_STARSHIPS_LINKS': {
            return {
                ...state,
                starships: action.data
            }
        }
        case 'GET_ONE_STARSHIP': {
            const data = {
                MGLT: action.data.MGLT,
                cargo_capacity: action.data.cargo_capacity,
                consumables: action.data.consumables,
                cost_in_credits: action.data.cost_in_credits,
                created: action.data.created,
                crew: action.data.crew,
                edited: action.data.edited,
                films: action.data.films,
                hyperdrive_rating: action.data.hyperdrive_rating,
                length: action.data.length,
                manufacturer: action.data.manufacturer,
                max_atmosphering_speed: action.data.max_atmosphering_speed,
                model: action.data.model,
                name: action.data.name,
                passengers: action.data.passengers,
                pilots: action.data.pilots,
                starship_class: action.data.starship_class,
                url: action.data.url,
                shipHasBeenChecked: false
            }
            //точно можно порефакторить, просто мозги уже кипят.
            // ...state, starshipsInfo: action.data - what about that configuration? state is null, microtasc was working good and middleware as set main data and added.
            // name is GET_ONE_STARSHIP => add to array? what the heppening here? change name for more informatical.
            // if you like to set one by one ships there, you can dispatch AC from ui and redux will be add here year selection 
            
            return {
                ...state,
                starshipsInfo: [
                    ...state.starshipsInfo,
                    data
                ]
            }
        }
            
            //there are alot of set data in bisnes.
        case 'GET_CHECKED_STARSHIP': {
            const data = state.starshipsInfo.map((el: StarshipType) => {
               
                return el.url === action.data ? { ...el, shipHasBeenChecked: !el.shipHasBeenChecked } : el
            })
            return {
                ...state,
                starshipsInfo: data
            }
        }
            //return state.map(ship => ship.name === action.name ? {...ship, filter: action.filter} : ship)
        default:
            return state
    }
}

//what about create a new file where you call action creater?

// actions
export const getFilm5AC = (data: any) => ({type: 'GET_FILM5', data} as const);
export const getStarShipsLinksAC = (data: any) => ({type: 'GET_STARSHIPS_LINKS', data} as const);
export const getOneStarShipAC = (data: any) => ({type: 'GET_ONE_STARSHIP', data} as const);
export const getCheckedStarShipAC = (data: string) => ({type: 'GET_CHECKED_STARSHIP', data} as const);



//what about create a new file where you call thunks? 
//for what to much types for STATUS? what about boolean and use finally? check it in learnJS, not for reason, if res or rej finally alary will work. Good? think yes
// thunks
export const getFilm5TC = () => async (dispatch: ThunkDispatch) => {
    // dispatch(setAppStatusAC('loading'))
    await film5API.getFilm5API()
        .then((res) => {
            //debugger
            dispatch(getFilm5AC(res.data))

            // dispatch(setAppStatusAC('succeeded'))
        }).catch((error) => {
            dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
            // dispatch(setAppStatusAC('failed'))
        })
}
export const getStarShipsLinksTC = () => async (dispatch: ThunkDispatch) => {
    //debugger
    // dispatch(setAppStatusAC('loading'))
    await film5API.getFilm5API()
        .then((res) => {
            // @ts-ignore
            dispatch(getStarShipsLinksAC(res.data.starships))
        }).catch((error) => {
            dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
            // dispatch(setAppStatusAC('failed'))
        })
}
//try - catche from below, and async await from up ... what about use one of them?
export const getOneStarShipTC = (url: string) => async (dispatch: ThunkDispatch) => {
    // dispatch(setAppStatusAC('loading'))
    try {
        const res = await starShipsAPI.getStarShips(url)

        // @ts-ignore
        dispatch(getCheckedStarShipAC(res))
        // dispatch(setAppStatusAC('succeeded'))
    }
    catch(error) {
            dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
            // dispatch(setAppStatusAC('failed'))
        }
}

export const getCheckedStarShipTC = (url: string) => async (dispatch: ThunkDispatch) => {
    // dispatch(setAppStatusAC('loading'))
    try {
        const res = await starShipsAPI.getStarShips(url)

        // @ts-ignore
        dispatch(getOneStarShipAC(res))
        // dispatch(setAppStatusAC('succeeded'))
    }
    catch(error) {
        dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
        // dispatch(setAppStatusAC('failed'))
    }
}



//types
type ActionsType =
    | ReturnType<typeof getFilm5AC>
    | ReturnType<typeof getStarShipsLinksAC>
    | ReturnType<typeof getOneStarShipAC>
    | ReturnType<typeof getCheckedStarShipAC>


type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType>


// | SetAppStatusActionType | SetAppErrorActionType
