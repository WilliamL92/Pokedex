import React, { useState, useEffect, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box"
import { getAllPokemons, getAllPokemonTypes } from "../../functions/fetchPokemonsData"
import PokemonCard from '../PokemonCard/PokemonCard';
import LangContext from '../../Context/LangContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import "./pokemonCardList.css"

const PokemonCardList = () => {

    const [pokeLists, setPokeLists] = useState<{name: string, image: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const { lang, setLang } = useContext(LangContext);
    const [types, setTypes] = useState<string[]>([])
    const [type, setType] = useState("TOUT");

    useEffect(()=>{
        (async ()=>{
            setLoading(true)
            const pokemonTypesObject = await getAllPokemonTypes(lang)
            setTypes(pokemonTypesObject)
            const pokemonsList = await getAllPokemons(lang)
            setType(lang === "fr"?"TOUT":"ALL")
            setPokeLists(pokemonsList)
            setLoading(false)
        })()
    }, [lang])
    return (
        <div>
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
                    <p>{lang === "fr"?"Chargement...":"Loading..."}</p>:
                    <div>
                        <FormControl id="formControl">
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: "20px",
                                "& > *": {
                                    marginLeft: "10px",
                                    marginRight: "10px"
                                }
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <InputLabel id="typeSelect">Type</InputLabel>
                            <Select
                                labelId="typeSelect"
                                id="typeSelectBox"
                                value={type}
                                label="Type"
                                onChange={(e)=>{setType(e.target.value)}}
                            >
                                <MenuItem value={lang === "fr"?"TOUT":"ALL"} key={0}>{lang === "fr"?"TOUT":"ALL"}</MenuItem>
                                {types.map((e, i) => <MenuItem key={i+1} value={e}>{e}</MenuItem>)}
                            </Select>
                            <TextField type="number" InputLabelProps={{ shrink: true, }} InputProps={{ inputProps: { min: 1 } }} id="max-pokemon" label="pokemons max" variant="standard" />
                        </Box>
                        </FormControl>
                        <div id="pokeListBox">
                        {pokeLists.map((e, i) => <Paper className="pokeCard" elevation={3} key={i}>
                            <PokemonCard name={e.name} id={i} image={e.image}></PokemonCard>
                        </Paper>)}
                    </div>
                    </div>
                }
            </Box>
        </div>
    );
};

export default PokemonCardList;