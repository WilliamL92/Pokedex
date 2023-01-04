import React from 'react';
import pokedexLogo from "../../media/pokedex-logo.png"
import "./pokedexLogo.css"

const PokedexLogo = () => {
    return (
        <div>
            <img id="pokedexLogo" src={pokedexLogo} alt="pokedex" height={150}/>
        </div>
    );
};

export default PokedexLogo;