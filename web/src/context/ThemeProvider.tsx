import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

interface Props {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark"> (
        (localStorage.getItem("ui.theme") as "light" | "dark") || "dark"
    );

    const toggleTheme = (): void => {
        const val = theme === "light" ? "dark" : "light";
        setTheme(val);
        console.log(val)
        localStorage.setItem("ui.theme", val);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;