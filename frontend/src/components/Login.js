import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, IconButton, InputAdornment } from "@mui/material";
import VTLogo from '../img/logo192.png'
import { useHomeCrudContext } from "../context/HomeCrudContext";
import apiUser from '../api/user'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {

  const {setUsername} = useHomeCrudContext();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const allFilled = inputUsername &&  inputPassword;
  const [errorMessage, setErrorMessage] = useState(false)
  const [errorMessage2, setErrorMessage2] = useState(false)
  const [show, setShow] = useState(false)
  const navigate = useNavigate();


  
//Get user from db and check 
const getCheckCredentialHandler =  async () => {
  const res = await apiUser.get("/users");
  if (res.data) {
        const users = res.data;
        const userMatch = users.find((user) => (
           user.username === inputUsername && user.password === inputPassword
        ))
        return userMatch;
}} 

// submit condition
const submit = async () => {
     if (!allFilled ) {
        setErrorMessage(true);
        return 
        } 
        setErrorMessage(false);
        setUsername(inputUsername);
        const userMatch = await getCheckCredentialHandler();
        if (userMatch) {
        navigate("/")
        } else {
        setErrorMessage2(true)
}}

// press enterkey = press login submit
const handleKeyPress = (e) => {
 if (e.key === "Enter") submit();
}



  return (
    <Box codelabel="background setup"
      sx={{ 
        height: "80vh",
        width: "100vw",
        bgcolor: "#ffffffff",      
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper   elevation={0} sx={{width: "350px",padding: 4,borderRadius: 3, textAlign: "center" }} >

        <Typography variant="h5" fontWeight="bold" > Welcome Back </Typography>
        <Typography variant="body2" color="grey" mb={2} mt={1}> Please enter you details below. </Typography>

        <TextField color="secondary" fullWidth label="Username" margin="normal" onKeyPress={handleKeyPress}
        value={inputUsername} onChange={(e) => setInputUsername(e.target.value)}/>

        <TextField color="secondary" fullWidth type={show ? "text" : "password" } label="Password" margin="normal" onKeyPress={handleKeyPress} 
        value={inputPassword} onChange={(e) => setInputPassword(e.target.value)}
        InputProps={{ endAdornment:(
          <InputAdornment position="end">
            <IconButton onClick={() => setShow(!show)}>
                  {show ? <VisibilityIcon/> : <VisibilityOffIcon/> }
            </IconButton>
          </InputAdornment>
        )}}
        />

        { !errorMessage ? null :
        <Typography variant="body2" color="primary" mb={1} mt={2}> Oops! Looks like you missed a field. </Typography> }
        
        { !errorMessage2 ? null :
        <Typography variant="body2" color="primary" mb={1} mt={2}> Oops! Invalid username or password. Please try again. </Typography> }
        
        <Button onClick={submit} fullWidth variant="contained"sx={{ mt: 3 }} > Login</Button>
        
      <Link to="/register">
      <Typography mt={4} variant="body2" color="black">
      Don't have an account?{" "}
      <Box component="span" fontWeight="bold" sx={{cursor:"pointer", color:"primary.main"}}>
      Sign Up
      </Box>
      </Typography>
      </Link>

<Box sx={{mt:5, display:"flex", flexDirection:"row", gap:1, alignItems:"center", justifyContent:"center" }}>
    
    <Box component="img" src={VTLogo} alt="VTLogo" sx={{height:20}} />

    <Typography  variant="h5" color="primary" fontWeight="bold" sx={{ fontFamily:"New Amsterdam"}}> 
    VIRAL
    <Box component="span" sx={{color:"#272727ff"}}>
    TODAY
    </Box>
    </Typography>

</Box>

      </Paper>
    </Box>
  );
}

export default Login;


