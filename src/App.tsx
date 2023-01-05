import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Home from "./pages/Home"
import Pokemon from "./pages/Pokemon"
import NotFound from "./pages/NotFound"
import "./sass/index.scss"
import ThemeContext from './Context/DarkModeContext';
import { DarkModeContextType } from "./types/pokemonsInterface"

function App() {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
      <div id="global">
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/Pokemon" element={<Pokemon/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
