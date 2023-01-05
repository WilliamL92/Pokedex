import React, { useState, useEffect, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box"
import { getAllPokemons } from "../../functions/fetchPokemonsData"
import PokedexLogo from '../PokedexLogo/PokedexLogo';
import PokemonCard from '../PokemonCard/PokemonCard';
import "./pokemonCardList.css"

const PokemonCardList = () => {

    const [pokeLists, setPokeLists] = useState<{name: string, image: string}[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getAllPokemons("fr").then((data: {name: string, image: string}[])=>{
            setPokeLists(data)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    return (
        <div>
            <PokedexLogo></PokedexLogo>
            <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: "center",
                    '& > :not(style)': {
                        width: "50vw",
                        height: 70,
                        minWidth: 400,
                        textAlign: "center"
                    },
                }}
            >
                {
                    loading?
                    <p>Chargement...</p>:
                    <div id="pokeListBox">
                        {pokeLists.map((e, i) => <Paper className="pokeCard" elevation={3} key={i}>
                            <PokemonCard name={e.name} id={i} image={e.image}></PokemonCard>
                        </Paper>)}
                    </div>
                }
            </Box>
        </div>
    );
};

export default PokemonCardList;