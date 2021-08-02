import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppErrorAC} from "./reducers/app-reducer";
import {CircularProgress, Table} from "@material-ui/core";
import {getFilm5AC, getFilm5TC} from "./reducers/film5-reducer";
import {film5API} from "./api/api";
import {ThunkDispatch} from "redux-thunk";
// @ts-ignore
import {ShipsList} from "./components/starShipsList";
import {Ship} from "./components/ship";





function App(props: any) {
    const dispatch = useDispatch()
    // const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
      const film5 = useSelector<AppRootStateType, any>(state => state.film5.data)//Обьект со всеми ссылками куда входил фильм №5

    const [sort, setSort] = useState('');

    function handleChange(event: any) {
        setSort(event.target.value);
    }
    // let sortedStarShips= [...props];


         //
        // useEffect(() => {
        //     film5.starships.map((starships: any) => dispatch(getFilm5TC(starships)))//Получение списка кораблей из фильма №5
        //     //return starships
        // }, [film5])

        // useEffect(() => {
        //     dispatch(getStarShipsTC())
        //     dispatch(getFilm5TC())
        // }, [])


        // if (status === 'loading') {
        //     return <div
        //         style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        //         <CircularProgress/>
        //     </div>
        // }
        // debugger

    const onClick=()=> {

    }

        return (

            <div>
                All Ships from film №5   <button onClick={onClick}>Compare selected StarShips</button>
                {/*<select value={sort} onChange={handleChange}>*/}
                {/*    <option>Sort by Name</option>*/}
                {/*    <option>Sort by Crew</option>*/}
                {/*    <option>Sort by Passengers</option>*/}
                {/*    <option>Sort by Cargo Capacity</option>*/}
                {/*    <option>Sort by Length</option>*/}

                {/*</select>*/}
                {/*<button type="button" onClick={() => setSortedField(null)}>*/}
                {/*    Sort by Name*/}
                {/*</button>*/}
                    <ShipsList/>

            </div>

        );
    }


    export default App;
