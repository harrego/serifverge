import FeedParser from "feedparser"
import bent from "bent"

export const vergeRssURL = "https://www.theverge.com/rss/index.xml"

export function fetchPosts(url) {
    return new Promise(async (resolve, reject) => {
        const feedparser = new FeedParser()

        feedparser.on("error", function(err) {
            reject(err)
        })

        var posts = []

        feedparser.on("readable", function() {
            var item
            while (item = this.read()) {
                const id = item["atom:id"]["#"] || item.link
                if (id == null || id == undefined) {
                    console.log(`[warning] skipping post \"${item.title}\", missing id`)
                    continue
                }
                const post = {
                    id: id,
                    title: item.title,
                    date: item.date,
                    link: item.link,
                    author: item.author
                }
                posts.push(post)
            }
        })

        feedparser.on("end", function() {
            resolve(posts)
        })

        const req = bent()
        try {
            const stream = await(req(url))
            stream.pipe(feedparser)
        } catch (err) {
            reject(err)
        }
    })
}
