import React from 'react';
import { pokemonCardInterface } from "../../types/pokemonsInterface"
import "./pokemonCard.css"

const PokemonCard = ({name, id, image}: pokemonCardInterface) => {
    return (
        <div className="pokemonRefCard">
            <img width={65} src={image} alt={`sprite-${name}`}></img>
            <p className="pokeCardText">{`${id+1}.${name}`}</p>
        </div>
    );
};

export default PokemonCard;