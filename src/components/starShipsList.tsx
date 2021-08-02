import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {Ship} from "./ship";
import {getStarShipsLinksTC} from "../reducers/film5-reducer";

export const ShipsList = () => {
    const dispatch = useDispatch()
    const links = useSelector<AppRootStateType, any>(state => state.film5.starships)
    const shipsInfo = useSelector<AppRootStateType, any>(state => state.film5.starshipsInfo)
    console.log('shipsInfo', shipsInfo)
    useEffect(() => {
        // setState(dispatch(getOneStarShipTC()))
        dispatch(getStarShipsLinksTC())
    }, [])
    // @ts-ignore

    console.log('links',links)
    const arrayDataStarShips = links?.map((url: string, i: number) => {
        return <Ship url={url} key={url} info={shipsInfo[i]}/>
    })

    return (
        <div>
            {arrayDataStarShips}
        </div>
    )
}