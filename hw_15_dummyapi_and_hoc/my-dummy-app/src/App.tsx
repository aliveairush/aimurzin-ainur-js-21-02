import React from 'react';
import './App.scss';
import SectionHeader from './components/sectionHeader/SectionHeader';
import Userlist from './components/userlist/Userlist';
import SectionFooter from './components/sectionFooter/SectionFooter';
import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext';

class App extends React.Component {
  render() {
    return (
      <ThemeContextProvider>
        <ThemeContext.Consumer>

          {(context) => (
            <div className={`App ${context.theme}`}>
              <section className="page-layout">
                <SectionHeader />
                <Userlist />
                <SectionFooter />
              </section>
            </div>
          )}

        </ThemeContext.Consumer>
      </ThemeContextProvider>

    );
  }
}

export default App;
