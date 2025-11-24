import React from "react";
import { useNavigate } from "react-router-dom";
import {Box, Paper, Typography, Button} from "@mui/material"
import VTLogo from "../img/logo192.png"



function SignDialog() {

   const navigate = useNavigate();

return (
<Box className="blur-bg" sx={{ position: "fixed", inset: 0, display: "flex", backdropFilter: "blur(20px)",
justifyContent: "center", alignItems: "center",bgcolor: "#ffffff78", zIndex: 10000}} >

    <Paper   elevation={0} sx={{ border: "1px solid #c8c8c87e",width: "450px",padding: 4,borderRadius: 3, textAlign: "center", mt:5, ml:2, mr:2 }} >

        <Box sx={{ mt:5,mb:3, display:"flex", flexDirection:"row", gap:1, alignItems:"center", justifyContent:"center" }}>          
            
            <Box component="img" src={VTLogo} alt="VTLogo" sx={{height:20}} />
            <Typography  variant="h4" color="primary" fontWeight="bold" 
            sx={{ fontFamily:"New Amsterdam"}}> 
            VIRAL
            <Box component="span" sx={{color:"#272727ff"}}>
            TODAY
            </Box>
            </Typography> 
            |
            <Typography  variant="h6" color="#eaa401ff" >MEMBER+</Typography>
        </Box>

        <Typography variant="h4" fontWeight="bold" sx={{letterSpacing: "-0.5px", lineHeight: 1.2}} > 
        Top Viral News Everyday </Typography>

        <Typography  variant="body1" color="secondary" mb={1} mt={2} ml={5} mr={5}> 
        Sign Up for Member+ to get full access on latest news for FREE. </Typography>

        <Box sx={{mb:1, mt:5, display:"flex", flexDirection:"row", gap:1, alignItems:"center", justifyContent:"center" }}>          
       
        <Button onClick={() => navigate("/register") } fullWidth variant="contained" > Sign Up </Button>
        
        <Button onClick={() => navigate("/login") }  fullWidth variant="outlined"sx={{ fontWeight:"bold" }} > Sign In </Button>
        </Box>        
            
        <Typography mt={5} mb={5} fontSize="small" color="secondary">
        Already a member? Click the Sign In button </Typography>

     </Paper>

</Box>
)}

export default SignDialog;