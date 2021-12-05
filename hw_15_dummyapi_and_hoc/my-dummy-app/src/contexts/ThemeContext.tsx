import React, { createContext, ReactNode } from 'react';

export interface IThemeContext {
  theme: string,
  toggleTheme: any
}

export const ThemeContext = createContext({} as IThemeContext);

interface Props {
  children: ReactNode
}

interface State {
  theme: string
}

class ThemeContextProvider extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: 'light',
    };

    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme = () => {
    this.setState({ theme: this.state.theme === 'light' ? 'dark' : 'light' });
  };

  render() {
    const { children } = this.props;
    return (
      <ThemeContext.Provider
        value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
