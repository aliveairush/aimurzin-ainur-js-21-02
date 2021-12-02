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
//
// class ThemeContextProvider extends React.Component<Props, State> {
//   constructor(props: any) {
//     super(props);
//     const prevTheme = localStorage.getItem('theme') || 'light';
//     this.state = {
//       theme: prevTheme,
//     };
//
//     this.toggleTheme = this.toggleTheme.bind(this);
//   }
//
//   toggleTheme = () => {
//     const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
//     localStorage.setItem('theme', newTheme);
//     this.setState({ theme: newTheme });
//   };
//
//   render() {
//     const { children } = this.props;
//     return (
//       <ThemeContext.Provider
//         value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
//       >
//         {children}
//       </ThemeContext.Provider>
//     );
//   }
// }

export default ThemeContextProvider;
