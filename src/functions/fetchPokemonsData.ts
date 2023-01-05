import axios from "axios"
import { pokeData, lang, pokeApiSingleSpecies, pokeApiSingle } from "../types/pokemonsInterface"

export function getPokemonSpeciesData(pokeName: string | number): Promise<pokeApiSingleSpecies>{
    return new Promise(async (resolve, reject)=>{
        const pokeSingleURL = `https://pokeapi.co/api/v2/pokemon-species/${pokeName}`
        try{
            const pokeData = await axios.get(pokeSingleURL)
            resolve(pokeData.data)
        }
        catch(err){
            reject(err)
        }
    })
}

export function getPokemonData(pokeName: string | number): Promise<pokeApiSingle>{
    return new Promise(async (resolve, reject)=>{
        const pokeSingleURL = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        try{
            const pokeData = await axios.get(pokeSingleURL)
            resolve(pokeData.data)
        }
        catch(err){
            reject(err)
        }
    })
}

export function getAllPokemons(lang: lang): Promise<{name: string, image: string}[]>{
    return new Promise(async (resolve, reject)=>{
        const pokeApiURL = "https://pokeapi.co/api/v2/pokemon-species?limit=100000"
        try{
            const pokemonNames = await axios.get(pokeApiURL)
            switch(lang){
                case "fr":
                    pokemonNames.data.results.map(async (e: pokeData, i: number) => {
                        const pokeDataSpecies = await getPokemonSpeciesData(i+1)
                        const pokeData = await getPokemonData(i+1)
                        pokemonNames.data.results[i] = {name: pokeDataSpecies.names[4].name, image: pokeData.sprites.front_default} // 4 is the index of the french name in the pokeApi object
                        if(i >= pokemonNames.data.results.length-1){
                            resolve(pokemonNames.data.results)
                        }
                    })
                    
                break;
                case "en":
                    resolve(pokemonNames.data.results.map(async (e: pokeData, i: number) => {
                        const pokeData = await getPokemonData(i+1)
                        return {name: e.name, image: pokeData.sprites.front_default}
                    }))
                break;
            }
        }
        catch(err){
            reject(err)
        }
    })
}