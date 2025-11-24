import { createContext, use, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/news";
import apiUser from "../api/user";
import React, {useEffect} from "react";

const HomeCrudContext = createContext();

export function HomeCrudContextProvider ({children}) {
const [articles, setArticles] = useState([]);
const [page,setPage] = useState(1);
const [searchPage, setSearchPage] = useState(1);
const [query, setQuery] = useState("");
const [isSearch, setIsSearch] =useState(false);
const [isOpen, setOpen] = useState((false))
const [errorMessage, setErrorMessage] = useState(false);
const navigate = useNavigate();
const location = useLocation();
const [password, setPassword] = useState("")
const [likedPost, setLikedPost] = useState([]);
const [username, setUsername] = useState(() => {
    const savedUsername = localStorage.getItem("username");
    return savedUsername || "";
})


//Add/post new USERNAME in local db
const addUserHandler = async (user) => {
    try {
        const res = await apiUser.post("/users", user);
        console.log ("New user registered:", res.data);
        navigate("/")
        }
catch (err) {
        console.log ("Error creating user:", err);
        }
    }

// Save username to local storage
useEffect(() => {
     localStorage.setItem("username", username);
    
}, [username])

//XXXXXXXXXX debuging code XXXXXXXXXXXXX
useEffect(() => {
    if (!articles.length) {
        const timer = setTimeout(() => {setErrorMessage(true)}, 1000)
        return () => clearTimeout(timer);
    } else {
        setErrorMessage(false)
    }
    console.log("Articles state changed:", articles);
}, [articles]);

// Get data from GNews API
const getData = async () => {
try { 
    const response = await api.get("/") 
    setArticles(response.data)
    console.log(`Get Data from memory cache`, response.data);
    }
catch (err) { 
    console.log (err)
    } 
}

// Get Data from cache send to homepage
  useEffect(() => {
    getData();
  },[])

// Get MORE data from GNews API and add to existing data
const loadMore = async () => {
console.log("LoadMore clicked");
  try {

      const newPage =(page+1);
      console.log(newPage);
      const response = await api.get(`/?page=${newPage}`);
      console.log(`Data retrieve from page ${newPage}:`, response.data);
      setArticles(prev => [...prev,...response.data]);
      setPage(newPage)

      } 
  catch (err) {
      console.log("There's an error:", err);
      }
};

// search more function---
  const handleMoreSearch = () => {
    getSearchMore();
    navigate(`${location.pathname}?q=${encodeURIComponent(query)}&page=${encodeURIComponent(searchPage)}`);
  };

//  ----Get more GNEWS data for search query
    const getSearchMore = async () => {
    try { 
        const newPage = (searchPage+1)
        const response = await api.get(`/search?q=${query}&page=${newPage}`)
        setArticles(prev => [...prev,...response.data])
        console.log("MORE Search query successfuly fetched:", response.data);
        setSearchPage(newPage)
        }
    catch (err) { 
        console.log (err)
        } 
    }

// Current time Function
const timeAgo = (dateString) => {

    const now = new Date();
  const past = new Date(dateString);
  const diff = (now - past) / 1000; // difference in seconds

  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;

  return `${Math.floor(diff / 31536000)} years ago`;

}

//---once page start, fetch favourites from local storage---
useEffect(() => {
    if (!username) return;
    const saved = localStorage.getItem(`likedStorage/${username}`);
         if (saved) {
        setLikedPost(JSON.parse(saved))
        console.log( "Fav data fetched from local storage", JSON.parse(saved))
        } else {
         setLikedPost([])  
        }
}, [username])

//Liked post function
const clickLike = (article) => {
      setLikedPost(prev => {
        const exists = prev.find((a) => a.id === article.id); 
        let updated;
    if (exists) {
        updated = prev.filter((a) => a.id !== article.id);
    } else {
        updated = [...prev, article];
    }
        console.log("New fav list updated:", updated);
        return updated;
  });
};

//save fav data to local storage
  useEffect(() => {
    localStorage.setItem(`likedStorage/${username}`, JSON.stringify(likedPost));    
    console.log("Fav saved to local storage:", likedPost);
}, [likedPost]);


const value = {
                getData,
                timeAgo,
                clickLike,
                loadMore,
                setOpen,
                setLikedPost,
                setArticles,
                setQuery,
                setIsSearch,
                handleMoreSearch,
                addUserHandler,
                setUsername,
                setPassword,
                setErrorMessage,
                articles,
                likedPost,
                isOpen,
                query,
                isSearch,
                searchPage,
                username,
                password,
                errorMessage,
                query
            }           

    return <HomeCrudContext.Provider value={value}>
        {children}
        </HomeCrudContext.Provider>
}

export function useHomeCrudContext() {
    return useContext(HomeCrudContext)
}