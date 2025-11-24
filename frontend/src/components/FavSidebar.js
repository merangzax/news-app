import { Box, Typography, IconButton, Slide, Button,
  List, ListItem, ListItemText, ListItemButton, ListItemAvatar,  Avatar,} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import React   from "react";
import "../App.css"
import { useHomeCrudContext } from "../context/HomeCrudContext";

function FavSidebar() {

const {setOpen, isOpen, likedPost, clickLike, setLikedPost } = useHomeCrudContext();



  return (

  // ----Slide animation----  
  <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit> 
  

      {/* ---Main Box--- */}
      <Box elevation={0} sx= {{ position: "fixed",  top: 0,  left: 0, width: "300px", height: "100vh",bgcolor: "rgba(255, 255, 255, 0.99)",  zIndex: 1200, p: 2 }} >  
          
          <div className="header">
            <Box sx={{  display: "flex", flexDirection: "column", gap: 1, mt:-2, ml:1 }}> 

              <Box  sx={{ display: "flex", flexDirection: "row", mt: 1, }}>
                <IconButton onClick={() => setOpen(false)} sx={{ mr:1, mt:2 }} className='fav-button' >
                <FavoriteIcon className={`fav-icon`}/>
                </IconButton>

                <Typography  variant="h3" color="primary" fontWeight="bold" sx={{ fontFamily:"New Amsterdam"}}> Viral</Typography>
                <Typography  variant="h3" fontWeight="bold" sx={{ fontFamily:"New Amsterdam", color:"#272727ff"}}>Today</Typography>
                <Typography  variant="h6" sx={{ p:1, fontFamily:"New Amsterdam", color:"rgba(255, 146, 68, 1)"}}>MEMBER+</Typography>
              </Box>

              <Typography variant="subtitle2" sx={{ color:"grey", display: "flex" ,transform: "translateY(-70%)", ml:6}}> Trending Now, Right Now </Typography>        
            </Box>
          </div>
            
          <div className="fav-post-list-box">
             <Box >
                <Box sx={{ display: "flex", flexDirection: "row", mt: 1, }}>
                    <Typography sx={{  ml:2, mt:1, mb:1}} fontWeight={"bold"} variant="body1">Favourite {'>'}</Typography>
                    <Button variant="outlined" sx={{ml:"auto"}} onClick={() => setLikedPost([])} >Clear All</Button>
                </Box>

                  <Box sx={{maxHeight:"90vh", overflowY:"auto"}}>
                    {likedPost.length === 0 ? ( 
                      
                        <List >
                        <ListItem sx={{ mr:1}}>
                            <ListItemText primary="Click Love Button to start adding post to favourite."
                            primaryTypographyProps={{ variant:"body2", textAlign:"center" ,sx: { color:"grey" , m:6, mt:0}}} />
                        </ListItem>
                        </List>

                    ) : (

                        likedPost.map((post,index) => {
                      
                        return(
                        <List >
                        <ListItem sx={{ mr:1}}>
                          
                          <ListItemAvatar>
                            <Avatar src={post.image} alt={post.title} />
                          </ListItemAvatar>


                          <ListItemButton  component="a" href={post.url} target="_blank" rel="noopener noreferrer">
                          <ListItemText  
                            primary={post.title}
                            primaryTypographyProps={{ m:-1,  fontWeight:"medium", variant:"body2", sx: { whiteSpace:"nowrap",  overflow: "hidden", textOverflow: "ellipsis"}}} />
                          </ListItemButton>
                          

                          <IconButton sx={{m:-1}} edge="end">
                            <ClearIcon onClick={() => {clickLike(post)}} />
                          </IconButton>

                        </ListItem>
                      </List>
                        )
                    }))}
                    
                </Box>
              </Box>
          </div>
          
      </Box>
  </Slide>
  );
}

export default FavSidebar;
