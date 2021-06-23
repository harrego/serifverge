import express from "express"
export const router = express.Router()

import { getPosts, getPost, getPostContent, insertPostContent } from "../src/db.js"
import { scrapePost } from "../src/scrape.js"

router.get("/", (req, res) => {
    const db = req.app.get("db")
    const posts = getPosts(db, 25)

    console.log(`[${(new Date()).toISOString()}][request] homepage`)

    res.render("index", { posts: posts })
})

router.get("/post/:post_id", async (req, res) => {
    const db = req.app.get("db")
    const postIdBase64 = req.params["post_id"]
    const postIdBuff = new Buffer(postIdBase64, "base64")
    const postId = postIdBuff.toString("ascii")

    let post = getPost(db, postId)
    if (!post) {
        res.sendStatus(404)
        return
    }

    console.log(`[${(new Date()).toISOString()}][request] post ${post.title}`)

    const postContent = getPostContent(db, postId)
    if (!postContent) {
        console.log(`[${(new Date()).toISOString()}][scraping] ${post.title}`)
        const scrapedPost = await scrapePost(post.link)
        res.render("post", { post: post, paragraphs: scrapedPost })
        insertPostContent(db, postId, scrapedPost)
    } else {
        res.render("post", { post: post, paragraphs: postContent })
    }
})
