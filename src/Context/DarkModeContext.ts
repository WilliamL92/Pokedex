import { createContext } from 'react';
import { DarkModeContextType } from "../types/pokemonsInterface"

export default createContext<DarkModeContextType>({
  darkMode: true,
  setDarkMode: () => {}
});