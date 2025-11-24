import React, { useState }  from "react";
import '../App.css'
import {AppBar, Toolbar, Box, Typography, Container, IconButton, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchComponent from './SearchComponent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useHomeCrudContext } from "../context/HomeCrudContext";
import LogoutIcon from '@mui/icons-material/Logout';


const Header = () => {

  const {setOpen, username, setUsername} = useHomeCrudContext();
  const [openPopup, setOpenPopup] = useState(false);


  const handlePopup = () => {
    if(!openPopup) {
      setOpenPopup(true)
    } else {
       setOpenPopup(false)
    }
  }

  const handleLogout = () => {
    setUsername("")
     window.location.assign("/")
  }

  const handleSearch = (query) => {
  console.log("(" ,query , ") is passed from Header to Search Component");
  }

  return (
    <div className="header">
      {openPopup ? 
      <Box sx={{ position: "fixed",top: 75,right: 20, bgcolor: "#ffffffff", 
       borderRadius: 3,  width: 200,  p: 2,zIndex: 2000, 
       boxShadow: "0 5px 10px 1px rgba(196, 196, 196, 0.7)"}}>
      
       <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{color:"black"}}/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ color:"secondary.main", fontWeight:"medium"}} >
              Log Out</ListItemText>
            </ListItemButton>
      
      </Box>

    : null }



   <AppBar elevation={0} className="blur-header" >
      <Toolbar >


<Box  sx={{ cursor:"pointer", display: "flex", flexDirection: "column", gap: 1 }}> 


    <Box sx={{ display: "flex", flexDirection: "row", mt: 1, }}>
        <IconButton  className={'fav-button'} onClick={() => setOpen(true)}sx={{ mr:1, mt:2, }}  >
        <FavoriteIcon className={`fav-icon`}/>
        </IconButton>

        <Typography onClick={() => window.location.assign("/")} variant="h3" color="primary" fontWeight="bold" sx={{ fontFamily:"New Amsterdam"}}> Viral</Typography>
        <Typography onClick={() => window.location.assign("/")} variant="h3" fontWeight="bold" sx={{ fontFamily:"New Amsterdam", color:"#272727ff"}}>Today</Typography>
        <Typography onClick={() => window.location.assign("/")} variant="h6" sx={{ p:1, fontFamily:"New Amsterdam", color:"rgba(255, 146, 68, 1)"}}>MEMBER+</Typography>

        
    </Box>
        <Typography onClick={() => window.location.assign("/")} variant="subtitle2" sx={{ color:"grey", display: "flex" ,transform: "translateY(-70%)", ml:6}}> Trending Now, Right Now </Typography>        
</Box>

    <Container sx={{ mt: 0 }}>
      <SearchComponent onSearch={handleSearch} />
    </Container>


        <Box onClick={handlePopup} sx={{ cursor:"pointer", display: 'flex', alignItems: 'center', p:1 }}>
            <PersonOutlineOutlinedIcon fontSize="medium" color="secondary" sx={{mr:{ xs:4, sm:1}}} />
            <Typography color="secondary" fontWeight="medium"  
            sx={{ display:{xs:"none", sm:"block"}, dm: 1, mr:2, whiteSpace: "nowrap" }}>
             {username ? username : "Guest "}
            </Typography>
            <Typography variant="h5" color="secondary">⌵</Typography>
        </Box>
      </Toolbar>
   </AppBar>
</div>
  );
};

export default Header;
