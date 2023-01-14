import React, { useState, useEffect, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box"
import { getAllPokemons, getAllPokemonTypes } from "../../functions/fetchPokemonsData"
import PokemonCard from '../PokemonCard/PokemonCard';
import LangContext from '../../Context/LangContext';
import DarkModeContext from '../../Context/DarkModeContext';
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
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    const [types, setTypes] = useState<string[]>([]);
    const [type, setType] = useState(0);

    useEffect(()=>{
        (async ()=>{
            setLoading(true)
            const pokemonTypesObject = await getAllPokemonTypes(lang)
            setTypes(pokemonTypesObject)
            const pokemonsList = await getAllPokemons(lang, type)
            setType(0)
            setPokeLists(pokemonsList)
            setLoading(false)
        })()
    }, [lang])

    async function handleChangeType(e: {target: {value: string}}){
        setType(+e.target.value)
        const resultLoadPokeList = await getAllPokemons(lang, +e.target.value)
        setPokeLists(resultLoadPokeList)
    }
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
                    <p style={{color: darkMode?"#F4F4F4":"#6C6C6C"}}>{lang === "fr"?"Chargement...":"Loading..."}</p>:
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
                                <InputLabel id="typeSelect" style={{color: darkMode?"#F4F4F4":"#6C6C6C"}}>Type</InputLabel>
                                <Select
                                    labelId="typeSelect"
                                    id="typeSelectBox"
                                    value={type.toString()}
                                    label="Type"
                                    onChange={handleChangeType}
                                    style={{color: darkMode?"#F4F4F4":"#6C6C6C"}}
                                >
                                    <MenuItem value={0} key={0}>{lang === "fr"?"TOUT":"ALL"}</MenuItem>
                                    {types.map((e, i) => <MenuItem key={i+1} value={i+1}>{e}</MenuItem>)}
                                </Select>
                                <TextField type="number" InputLabelProps={{ shrink: true, style: {color: darkMode?"#F4F4F4":"#6C6C6C"} }} InputProps={{ inputProps: { min: 1, max: 905 } }} id="max-pokemon" defaultValue={905} label="limit" variant="standard" sx={{ input: { color: darkMode?"#F4F4F4":"#6C6C6C" } }}/>
                            </Box>
                            </FormControl>
                            <div id="pokeListBox">
                            {pokeLists.map((e, i) => <Paper className="pokeCard" elevation={3} key={i}>
                                <PokemonCard name={e.name} image={e.image}></PokemonCard>
                            </Paper>)
                            }
                        </div>
                    </div>
                }
            </Box>
        </div>
    );
};

export default PokemonCardList;