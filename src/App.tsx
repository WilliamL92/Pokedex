import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Home from "./pages/Home"
import Pokemon from "./pages/Pokemon"
import NotFound from "./pages/NotFound"
import "./sass/index.scss"
import ThemeContext from './Context/DarkModeContext';
import langContext from './Context/LangContext';
import LangContext from './Context/LangContext';
import PokedexLogo from './components/PokedexLogo/PokedexLogo';
import { lang as langType } from "./types/pokemonsInterface"

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [lang, setLang] = useState<langType>("fr")
  return (
    <LangContext.Provider value={{lang, setLang}}>
      <ThemeContext.Provider value={{darkMode, setDarkMode}}>
        <div id="global" className={darkMode?"global-font-dark":"global-font-light"}>
          <PokedexLogo></PokedexLogo>
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/Pokemon" element={<Pokemon/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export default App;
