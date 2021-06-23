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
    console.log(`server started at ${port}`)
})
