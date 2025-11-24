import '../App.css';
import { Box,Card, CardContent, CardMedia, Typography, Button, Container, IconButton } from "@mui/material";
import { useHomeCrudContext } from '../context/HomeCrudContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

import SignDialog from './SignDialog';


function Home() {

  const { username, articles, timeAgo, clickLike, likedPost, loadMore, isOpen, isSearch, handleMoreSearch, errorMessage } = useHomeCrudContext();


  

  
  return (  
  <Container sx={{ padding: 4, mt: 4}}> {/* mt pushes content down */}
  
  {username ? null : <SignDialog/> }
      
  
    {/* ---Box just to push the news content to left when FavSidebar isOpen--- */}
    <Box sx={{  display: "flex", flexWrap: "wrap", justifyContent: "center",transition: "transform 0.1s ease-in-out",
    transform: 
    { xs: "translateX(0)" , md: isOpen ? "translateX(150px)" : "translateX(0)" },}}>


  <div className="news-grid">

    {articles.map((article, index) => {
      const isLiked = likedPost.find((a) => a.id === article.id)
     
     // Top story styling
      if (index === 0 && isSearch === false && article.length ) {
        return (

          
        <Card key={article.id} sx={{ gridColumn: { xs:"span 1", sm:"span 2", md:"span 3" } }}> {/* spans full width in grid */}

          <Box sx={{position:"relative"}}>

                
                <CardMedia component="img" image={article.image} alt={article.title}  sx={{ height: 450 , width:"100%", objectFit:"cover" }} />
                
                <Box className="gradient"/>  
                    <IconButton className='love-btn' onClick={() => clickLike(article)}>
                    <FavoriteIcon className={`love-icon ${isLiked ? "liked" : ""}`}/>
                    </IconButton>

                <CardContent sx={{position: 'absolute',bottom: 16,left: 16,right: 16, color: 'white', zIndex: 2}}> 
                      <Typography className="title-css" variant="h4" >{article.title.length > 150 ? article.title.slice(0, 150) + "..." : article.title} </Typography>
                      <Typography variant="body1" sx={{ zIndex: 2, position: "relative" }}>  {article.description.length > 500 ? article.description.slice(0, 500) + "..." : article.description} </Typography>
                      <Typography sx={{mt:2}} variant="body2">{timeAgo(article.publishedAt)} </Typography>
                      <Button href={article.url} target="_blank" variant="contained" sx={{ mt: 2, fontWeight: "bold", zIndex: 2, position: "relative" }} > Read More </Button>
                </CardContent>
          </Box>
      </Card>
        );
      }  
      else  {
          return (
      <Card elevation={0} key={article.id}>
      <Box  sx={{ position: "relative" }}>

      <Box component="a"href={article.url}target="_blank"rel="noopener noreferrer"sx={{color: "inherit",textDecoration: "none", display: "block" }}>
      <CardMedia component="img"  height={200} image={article.image} alt={article.title} />
      </Box>  

      <IconButton className='love-btn' onClick={() => clickLike(article)}>
        <FavoriteIcon className={`love-icon ${isLiked ? "liked" : ""}`}/>
      </IconButton>
    
      </Box>

      <CardContent>
          <Typography fontWeight="bold" variant="body1">{article.title.length >100 ? article.title.slice(0,100) + "..." : article.title}</Typography>
          <Typography sx={{mt:1}} variant="body2">{timeAgo(article.publishedAt)}</Typography>
           <Button href={article.url} target="_blank" variant="outlined" color="error"  sx={{  fontWeight:"bold" , mt: 1 }} > Read More </Button>
      </CardContent>

     </Card>
  
          )}
             
})}
</div>
        
        { !articles.length && errorMessage ? 
 
        <Box height="35vw">
        <Typography variant='body1' color="secondary" textAlign="center"  p={4} >
        Sorry, there are not result. (╥﹏╥) Please try again </Typography>
        </Box>
     
        : 

        <Button variant="contained"sx={{  fontWeight:"bold", width: "200px", 
        display: "block", margin: "20px auto", padding: "12px 0" }} 
        onClick={isSearch ? handleMoreSearch : loadMore}>More News</Button>
        }
        
        
        

</Box>

</Container>
  );
}
export default Home;

