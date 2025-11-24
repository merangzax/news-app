import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, Checkbox, FormControlLabel, InputAdornment, IconButton, Icon } from "@mui/material";
import VTLogo from '../img/logo192.png'
import { useHomeCrudContext } from "../context/HomeCrudContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Register() {

    const { addUserHandler, username, setUsername, password, setPassword} = useHomeCrudContext();
    const [email, setEmail] = useState("")
    const [isClick, setIsClick] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [checkboxError, setCheckboxError] = useState(false);
    const [show, setShow] = useState(false);
    


    const allFilled = username && email && password;


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

        <Typography variant="h5" fontWeight="bold" > Sign Up for Free Member+ Account </Typography>
        <Typography variant="body2" color="grey" mb={2} mt={1}> 
        Get trending news fast. Enter details below to get started.
        </Typography>


        <TextField color="secondary" fullWidth label="Username" margin="normal" 
        value={username} onChange={(e) => setUsername(e.target.value)}/>

        <TextField color="secondary" fullWidth label="Email" margin="normal" 
        value={email} onChange={(e) => setEmail(e.target.value) } />

        <TextField color="secondary" fullWidth type={show? "text" : "password"} 
        label="Password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)}
        InputProps={{ endAdornment:(
          <InputAdornment position="end">
            <IconButton onClick={() => setShow(!show)}>
              {show ? <VisibilityIcon/> : <VisibilityOffIcon/> }
            </IconButton>

          </InputAdornment>
        )}}
        />

        {!allFilled && isClick ? <Typography mt={2}variant="body2" color="primary">
        All fields must be entered!</Typography> : null }

        <FormControlLabel sx={{mt:2}} control={
            <Checkbox  checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)} />}
        label ={ !checkboxError ? <Typography  variant="body2" color="grey"> *Please make sure your username, email and password is correct. </Typography>
               : <Typography variant="body2" color="error"> *Please make sure your username, email and password is correct. </Typography>
               } 
        />

        <Button onClick={() => {
            setIsClick(true)
            if (allFilled && checkbox) 
            {
                addUserHandler({ username, email, password})
            } else if (allFilled && !checkbox)  
                setCheckboxError(true); 
        }} 
        fullWidth variant="contained"sx={{ mt: 3 }} > 
        Sign Up 
        </Button>
        
        <Link to="/login">
        <Typography mt={4} variant="body2" color="black">
            Already have an account?{" "}
            <Box component="span" fontWeight="bold" sx={{cursor:"pointer", color:"primary.main"}}>
                Log In
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

export default Register;


