import React from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box"
import { getAllPokemons } from "../../functions/fetchPokemonsData"
import PokedexLogo from '../PokedexLogo/PokedexLogo';

const PokemonCardList = () => {
    getAllPokemons()
    return (
        <div>
            <PokedexLogo></PokedexLogo>
            <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: "center",
                    '& > :not(style)': {
                        width: "50vw",
                        height: "50vh",
                        minWidth: 400,
                        minHeight: 300,
                    },
                }}
            >
                <Paper elevation={3} />
            </Box>
        </div>
    );
};

export default PokemonCardList;