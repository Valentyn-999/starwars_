import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./reducers/app-reducer";
import {film5Reducer} from "./reducers/film5-reducer";


// combine reducers with combineReducers,
// we set the structure of our only state object
const rootReducer = combineReducers({
     film5: film5Reducer,
     app: appReducer
})

// create store directly
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// automatically determine the type of the entire state object
export type AppRootStateType = ReturnType<typeof rootReducer>
