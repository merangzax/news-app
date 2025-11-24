
import React, { useState, useEffect, useRef, } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Box, IconButton, AppBar, Toolbar, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../api/news"
import { useHomeCrudContext } from "../context/HomeCrudContext";

function SearchComponent({ onSearch }) {

  const { setArticles, query, setQuery, setIsSearch, searchPage } = useHomeCrudContext();
  const [showHeader, setShowHeader] = useState(false); // small screen header
  const newHeaderRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isSmallScreen = useMediaQuery("(max-width:600px)"); // detect screen size

  // search function---
  const handleSearch = () => {
    console.log("handleSearch triggered");
    if (onSearch) onSearch(query);
    setArticles([]);
    getSearch();
    setIsSearch(true);
    navigate(`${location.pathname}?q=${encodeURIComponent(query)}&page=${encodeURIComponent(searchPage)}`);
  };

//  ---then search query from GNEWS api
    const getSearch = async () => {
    try { 
        console.log("getSearch called, fetching new search results...");
        const response = await api.get(`/search?q=${query}`)
        console.log("Search query successfuly fetched, about to set articles:", response.data);
        setArticles(response.data)
        }
    catch (err) { 
        console.log (err)
        } 
    }



  // press Enter key to search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // close small screen header if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newHeaderRef.current && !newHeaderRef.current.contains(event.target)) {
        setShowHeader(false);
      }
    };
    if (showHeader) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showHeader]);

  // --- Render ---

  // Large screen: normal search bar
  if (!isSmallScreen) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton color="secondary" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
    );
  }

  // Small screen
  return (
    <>
      {/* Only icon visible */}
      {!showHeader && (
        <IconButton color="secondary" onClick={() => setShowHeader(true)}>
          <SearchIcon />
        </IconButton>
      )}

      {/* Expanded search header */}
      {showHeader && (
        <AppBar position="fixed" elevation={0} sx={{ height: 0.9, backgroundColor: "white", zIndex: 1200 }}>
          <Toolbar ref={newHeaderRef} sx={{ width: "100%" }}>
            <Box sx={{ position: "relative", width: "75%", p:3 }}>
              <TextField
                autoFocus
                color="secondary"
                label="Search News"
                variant="outlined"
                size="small"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <IconButton
                sx={{ position: "absolute", right: 0 , top: "30%", transform: "translateX(60%)"}}
                color="secondary"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}

export default SearchComponent;
