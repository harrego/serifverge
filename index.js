import { configureDb, insertPosts, getPosts } from "./src/db.js"
import { fetchPosts, vergeRssURL } from "./src/rss.js"
import { scrapePost } from "./src/scrape.js"
import { router } from "./routes/index.js"

import express from "express"

const app = express()

const db = configureDb()

app.set("db", db)
app.set("view engine", "ejs")
app.use("/", router)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`[${(new Date()).toISOString()}][server] started at port ${port}`)
})

async function fetchTimer() {
    try {
        const posts = await fetchPosts(vergeRssURL)
        insertPosts(db, posts)
    } catch (err) {
        console.log(`[${(new Date()).toISOString()}][fetch timer][error] ${err}`)
    }
    // Run every 30 minutes
    setTimeout(fetchTimer, 1800000)
}
fetchTimer()
