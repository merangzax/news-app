import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './components/App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HomeCrudContextProvider } from './context/HomeCrudContext';


const theme = createTheme({

  typography: {
    fontFamily: "Poppins", 
  }, 
  palette: {
    mode: 'light', // or 'dark'
    primary: {  
      main: '#fc4141ff',
    },
    secondary: {
      main: '#595959ff',
    },
 
  },


});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    
    
    <ThemeProvider theme={theme}>
      <Router>
        <HomeCrudContextProvider>
          <App />
        </HomeCrudContextProvider>
      </Router>
    </ThemeProvider>
   
);

