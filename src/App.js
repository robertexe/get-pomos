import React from 'react';
import AuthComponent from './containers/AuthComponent'
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themefile.js'
import './App.css';




const App = (props) => {
  console.log(theme)
  return (
    <MuiThemeProvider theme={theme}>
    <AuthComponent />
    </MuiThemeProvider>
  )
}
export default App;
