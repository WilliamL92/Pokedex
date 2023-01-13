import { createContext } from 'react';
import { LangContextType } from "../types/pokemonsInterface"

export default createContext<LangContextType>({
  lang: "fr",
  setLang: () => {}
});