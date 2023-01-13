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
        const pokeApiURL = "https://pokeapi.co/api/v2/pokemon-species?limit=905"
        const pokemonNames = await axios.get(pokeApiURL)
        switch(lang){
            case "fr":
                pokemonNames.data.results.map(async (e: pokeData, i: number) => {
                    let pokeDataSpecies
                    let pokeData
                    try{
                        pokeDataSpecies = await getPokemonSpeciesData(i+1)
                        pokeData = await getPokemonData(i+1)
                    }
                    catch(err){
                        reject(err)
                    }
                    if(typeof(pokeDataSpecies) !== "undefined" && typeof(pokeData) !== "undefined" && typeof(pokeDataSpecies.names[4]) !== "undefined"){
                        pokemonNames.data.results[i] = {name: pokeDataSpecies.names[4].name, image: pokeData.sprites.front_default} // 4 is the index of the french name in the pokeApi object
                    }
                    if(i >= pokemonNames.data.results.length-1){
                        resolve(pokemonNames.data.results)
                    }
                })
                
            break;
            case "en":
                pokemonNames.data.results.map(async (e: pokeData, i: number) => {
                    let pokeData
                    try{
                        pokeData = await getPokemonData(i+1)
                    }
                    catch(err){
                        reject(err)
                    }
                    if(typeof(pokeData) !== "undefined"){
                        pokemonNames.data.results[i] = {name: e.name, image: pokeData.sprites.front_default}
                    }
                    if(i >= pokemonNames.data.results.length-1){
                        resolve(pokemonNames.data.results)
                    }
                })
            break;
        }
    })
}

export function getAllPokemonTypes(): Promise<{name: string}[]>{
    return new Promise(async (resolve, reject)=>{
        const typesURL = "https://pokeapi.co/api/v2/type";
        try{
            const pokeData = await axios.get(typesURL);
            resolve(pokeData.data.results);
        }
        catch(err){
            reject(err);
        }
    })
}