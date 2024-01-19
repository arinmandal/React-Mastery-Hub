import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
})

// create theme provider
export const ThemeProvider = ThemeContext.Provider

// hooks
export default function useTheme(){
    return useContext(ThemeContext)
}