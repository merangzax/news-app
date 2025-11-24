const express = require('express');
const axios = require('axios');
const router = express.Router();


const CACHE_DURATION = 1000 * 60 * 60 * 5; // 5 hour
let cacheTime = 0;
let cachedArticles = [];

// -----reqeust top headline
router.get("/", async (req, res) => {
  try {
      const now = Date.now();
      const page = req.query.page || 1;   // get page number from query, default 1
      if ( page === 1 && cachedArticles.length && now - cacheTime < CACHE_DURATION) {
        console.log(`Serving page from memory cache`);
        return res.json(cachedArticles);
      }
      
      const response = await axios.get( "https://gnews.io/api/v4/top-headlines", { params: { country: "my", lang: "en", max: 10, page: page, token: process.env.GNEWS_API } } );
      console.log("Fetched page:", page, "from", response.request.res.responseUrl );
      cachedArticles = response.data.articles;
      cacheTime = now;
      res.json(response.data.articles);

      
   

      } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch from GNews" });
      }
});

// -----reqeust search query
router.get("/search", async (req, res) => {
  try {
      const page = req.query.page || 1;
      const query = req.query.q || 1;
      const response = await axios.get( "https://gnews.io/api/v4/search", { params: { lang: "en", max: 10, page: page, q:query, token: process.env.GNEWS_API } } );
      console.log("Searhing query(", query, ")from GNEWS" );
      console.log("Fetched page:", page, "from", response.request.res.responseUrl );
      res.json(response.data.articles);
      }
      catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch search from GNews" });
      }
});




module.exports = router;

