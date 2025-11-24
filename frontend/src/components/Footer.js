import React from "react";
import {Box, Typography, Divider} from "@mui/material";
import Logo from "../img/logo-black.png"


function Footer() {

    return (
     
     <Box component="footer" sx={{backgroundColor: "#ffffffff", 
        color: "black", py: 4,  px: { xs: 2, sm: 4, md: 8 }, mt: "auto", }}>

           <Divider sx={{mb:3, borderBottomWidth: 2}}/>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, 
            alignItems: "center", justifyContent: "center", gap:{ xs: 1, sm: 2 } }}>

                    <Box component="img" src={Logo} alt="Logo" sx={{ height: 20 }} />
                    <Typography variant="caption">Create by: Imran Muhammad Zaki &nbsp; | &nbsp; 
                    Email: imranmuhdzaki@linkedin.com &nbsp; | &nbsp; Phone: +6018-904-5244</Typography>         
            </Box>

        {/* copyright */}
        <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 2, color:"grey" }}>
            © 2025 Imran Muhammad Zaki. All rights reserved.
        </Typography>

    </Box>
  );
}


export default Footer;