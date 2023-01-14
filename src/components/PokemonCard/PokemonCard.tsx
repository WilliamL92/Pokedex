import React, { useContext } from 'react';
import { pokemonCardInterface } from "../../types/pokemonsInterface";
import DarkModeContext from '../../Context/DarkModeContext';
import "./pokemonCard.css";

const PokemonCard = ({name, image}: pokemonCardInterface) => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    return (
        <div className="pokemonRefCard" style={{backgroundColor: darkMode?"#6C6C6C":"#F4F4F4"}}>
            <img width={65} src={image} alt={`sprite-${name}`}></img>
            <p className="pokeCardText" style={{color: darkMode?"#F4F4F4":"#6C6C6C"}}>{`${name}`}</p>
        </div>
    );
};

export default PokemonCard;