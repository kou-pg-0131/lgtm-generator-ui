import React from 'react';
import { AppProps } from 'next/app';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import '../styles/global.scss';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1E90FF',
      dark: '#0070DF',
      light: '#E8EEF2',
    },
  },
});

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Component {...pageProps}/>
    </ThemeProvider>
  );
};

export default App;
