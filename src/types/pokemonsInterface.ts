export interface pokeData{
    name: string;
}

export interface pokemonCardInterface {
    name: string;
    id: number;
    image: string;
}

export type lang = "fr" | "en"

export interface pokeApiSingleSpecies {
    names: {language: {name: string}, name: string}[]
}

export interface pokeApiSingle { 
    sprites: { front_default: string }
}

export interface DarkModeContextType {
    darkMode: boolean;
    setDarkMode: (bool: boolean)=>void;
}

export interface LangContextType {
    lang: lang;
    setLang: (str: lang)=>void;
}