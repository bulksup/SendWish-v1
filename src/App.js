import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import Navigation from './navigations';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.background} barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
