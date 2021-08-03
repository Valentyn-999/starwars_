import {FC} from 'react';
import {getCheckedStarShipAC} from "../reducers/film5-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {InputComponent} from "./InputComponent";
import {StarshipType} from "../reducers/Types";

// type PropsType = {
//     url: string
//     info: StarshipType
// }

interface shipPropType {
    url: string,
    info: StarshipType
}

export const Ship: FC<shipPropType> = ({
    url, 
    info
}) => {
    
    //always use props not good idea. if you like use TS alrady need to use easy way than prop.somthing. 
    //just mark: if you dont like use interface and like to use props, better use destructurisation, its more undestarting for anather dev 
    // example: const {name, shipHasBeenChecked, ...restProps} = props
    
    const dispatch = useDispatch()
    const oneLink = useSelector<AppRootStateType, any>(state => state.film5.starships)

    const setShipChecked = (urlAsID: string) => {
        dispatch(getCheckedStarShipAC(urlAsID))
    }

    
    // if !info - loading? could you add content where you dont have any data? better for you create loading component and use it anyware 
    //when flag is true you ponited loading elso null. To easy use that: {isLoading && <LoadingComponent/>}
    if (!info) {
        return <>Loading...</>
    }
//no need requer here prop: info.name is requered there in props, if null - could you check pls that upper and change props
    //if info can be undefined, why you write jsx? may be better {info.name ? <div>name: <b>{info.name}</b></div> : <div>dont have nave</div>  } - just for example 
    return (
        <>
            <div>name: <b>{info.name}</b></div> 
            <InputComponent value={info.shipHasBeenChecked} onChange={() => setShipChecked(props.info.url)}/>
        </>
    );
}

//GOOD LUCK!) 
