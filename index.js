import { fetchPosts, vergeRssURL } from "./src/rss.js"
import { scrapePost } from "./src/scrape.js"

// fetchPosts(vergeRssURL)
scrapePost("https://www.theverge.com/22543812/navajo-nation-radio-stations-coronavirus-dine-bizaad-ktnn-kyat")
