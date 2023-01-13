import React, {useState, useContext, useEffect } from 'react';
import pokedexLogo from "../../media/pokedex-logo.png"
import "./pokedexLogo.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ThemeContext from '../../Context/DarkModeContext'
import LangContext from '../../Context/LangContext';
import { lang as langType } from "../../types/pokemonsInterface"

const PokedexLogo = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext)
    const { lang, setLang } = useContext(LangContext)

    const handleChangeTheme = (displayMode: {target: {value: string}})=>{
        setDarkMode(displayMode.target.value === "dark")
    }

    const handleChangeLang = (langMode: {target: {value: string}})=>{
        if(langMode.target.value === "fr" || langMode.target.value === "en"){
            setLang(langMode.target.value)
        }
    }
    return (
        <div id="headerPanel">
            <FormControl id="formControl">
                <InputLabel id="langSelect">Language</InputLabel>
                <Select
                labelId="langSelect"
                id="langSelectBox"
                value={lang}
                label="Language"
                onChange={handleChangeLang}
                >
                <MenuItem value={"fr"}>FR</MenuItem>
                <MenuItem value={"en"}>EN</MenuItem>
                </Select>
            </FormControl>
            <img id="pokedexLogo" src={pokedexLogo} alt="pokedex" height={150}/>
            <FormControl id="formControl">
                <InputLabel id="themeSelect">Thème</InputLabel>
                <Select
                labelId="themeSelect"
                id="themeSelectBox"
                value={darkMode?"dark":"light"}
                label="Theme"
                onChange={handleChangeTheme}
                >
                <MenuItem value={"dark"}>DARK</MenuItem>
                <MenuItem value={"light"}>LIGHT</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default PokedexLogo;