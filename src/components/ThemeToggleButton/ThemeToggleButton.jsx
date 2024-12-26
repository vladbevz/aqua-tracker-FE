import { useState } from "react";
import css from "./ThemeToggleButton.module.css";
import { CgDarkMode } from "react-icons/cg";

const ThemeToggleButton = () => {
    
    const [theme, setTheme] = useState("dark");

    const handleChangeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        document.body.className = theme;
    }

    return (
        <button onClick={handleChangeTheme} className={css.btn}><CgDarkMode /></button>
    );
};

export default ThemeToggleButton;