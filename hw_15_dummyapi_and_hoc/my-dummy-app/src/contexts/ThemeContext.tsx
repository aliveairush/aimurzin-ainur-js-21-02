import React, { createContext, ReactNode, useState } from 'react';

export interface IThemeContext {
  theme: string,
  toggleTheme: any
}

export const ThemeContext = createContext({} as IThemeContext);

interface Props {
  children: ReactNode
}

const ThemeContextProvider = ({ children }: Props) => {
  const prevTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(prevTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
