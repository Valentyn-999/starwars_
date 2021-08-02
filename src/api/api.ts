import axios from 'axios'


// const settings = {
//     withCredentials: true,
//     headers: {
//
//     }
// }

// Create instance
const instance = axios.create({
    baseURL: 'https://swapi.dev/api',
    // ...settings
})


// API
export const starShipsAPI = {

    getStarShips(url: string) {
        debugger
        axios.get<ResponseDataType>(url).then(res => {
            debugger
            return res.data
        });
    }
}

export const film5API = {
    getFilm5API() {
        const promise = instance.get<ResponseDataType>('/films/5/');
        return promise;
    }
}

// types
export type ResponseStarShipsType = {
    "MGLT": string,
    "cargo_capacity": number,
    "consumables": string,
    "cost_in_credits": number,
    "created": string,
    "crew": number,
    "edited": string,
    "hyperdrive_rating": string,
    "length": number,
    "manufacturer": string,
    "max_atmosphering_speed": string,
    "model": string,
    "name": string,
    "passengers": number,
    "films": [],
    "pilots": [],
    "starship_class": string,
    "url": string
}

export type ResponseFilmsType = {
    "title": string,
    "episode_id": number,
    "opening_crawl": string,
    "director": string,
    "producer": string,
    "release_date": string,
    "characters": string[],
    "planets": string[],
    "starships": string[],
    "vehicles": string[],
    "species": string[],
    "created": string,
    "edited": string,
    "url": string
}
export type ResponseDataType = {
    // "status": string
    data: ResponseStarShipsType

}


