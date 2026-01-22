import { create } from "zustand";
import logo_light from "../../images/logo_light.png";
import logo_dark from "../../images/logo_dark.png";

const useThemeStore = create((set, get) => ({
    theme:  localStorage.getItem('theme') ?? 'light',
    logo:  logo_light,
    toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        console.log('toggle', newTheme);
        get().themeSetter(newTheme);
    },
    themeSetter: (selectedTheme) => {
        const root = document.documentElement;
        const logo = selectedTheme === 'light' ? logo_light : logo_dark;
        console.log('theme', selectedTheme);
        root.setAttribute('data-theme', selectedTheme)
        set({theme: selectedTheme, logo: logo});
        localStorage.setItem('theme', selectedTheme);
    }
}));

export default useThemeStore;
