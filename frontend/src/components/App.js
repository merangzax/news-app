import '../App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from '@mui/material';
import Home from "./Home";
import Header from './Header';
import Footer from './Footer';
import FavSidebar from './FavSidebar';
import React from 'react';
import SearchComponent from './SearchComponent';
import Login from './Login';
import Register from './Register';

function App() {

const location = useLocation();

if (location.pathname === "/login") {
 return (
    <Box sx={{minHeight: "100vh", display: "flex",flexDirection: "column", 
    justifyContent:"center", alignItems:"center", bgcolor:"#ffffffff"}} >

    <Box sx={{ flex: 1,display: "flex",justifyContent: "center", alignItems: "center" }}>
    <Login />
    </Box>
    <Footer />
    </Box>
  );

  } else if (location.pathname === "/register") {
    return (
    <Box sx={{minHeight: "100vh", display: "flex",flexDirection: "column", 
    justifyContent:"center", alignItems:"center", bgcolor:"#ffffffff"}} >

    <Box sx={{ flex: 1,display: "flex",justifyContent: "center", alignItems: "center" }}>
    <Register />
    </Box>
    <Footer />
    </Box>
  )
    
  } else {
    return (
        <>
        
            <SearchComponent />
            <FavSidebar/>
            <Header />
            <Routes>
              <Route path="/" exact element={ <Home/> } />
            </Routes>
            <Footer/>
        </>     

        )
      }
  
}



export default App;
