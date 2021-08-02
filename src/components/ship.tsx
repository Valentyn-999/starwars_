import React, {useEffect, useState} from 'react';
import {TableCell} from "@material-ui/core";
import {getOneStarShipAC, getOneStarShipTC} from "../reducers/film5-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import axios from "axios";
import {ResponseDataType} from "../api/api";

type PropsType = {
    url: string
    info: any
}
export const Ship = (props: PropsType) => {
    console.log(props.info)
    const dispatch = useDispatch()
    const oneLink = useSelector<AppRootStateType, any>(state => state.film5.starships)
    const [state, setState] = useState<any>({});

    useEffect(() => {
        axios.get<ResponseDataType>(props.url).then(res => {
            // @ts-ignore
            dispatch(getOneStarShipAC(res.data))
        });

    }, [])

    if (!props.info) {
        return null
    }
    return (

        <div>
            <input type="checkbox" value={'value'}/>
            <div> name: <b>{props.info.name}</b></div>

            {/*<div>Crew: <b>{crew}</b></div>*/}
            {/*<div>Passengers: <b>{passengers}</b></div>*/}
            {/*<div>Cargo capacity: <b>{cargo_capacity}</b></div>*/}
            {/*<div>Length: <b>{length}</b></div>*/}
            {/*<div>{oneShip.name}</div>*/}


        </div>

    );
}