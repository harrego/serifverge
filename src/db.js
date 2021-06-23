import SQLite3 from "better-sqlite3"

export function configureDb() {
    const db = SQLite3("serifverge.sqlite")

    db.prepare("CREATE TABLE IF NOT EXISTS posts ( post_id TEXT PRIMARY KEY, title TEXT, date INTEGER, link TEXT, author TEXT, UNIQUE(post_id) )").run()
    db.prepare("CREATE TABLE IF NOT EXISTS posts_content ( post_id TEXT PRIMARY KEY, content TEXT, FOREIGN KEY(post_id) REFERENCES posts(post_id), UNIQUE(post_id) )").run()

    return db
}

export function insertPosts(db, posts) {
    const insert = db.prepare("INSERT OR IGNORE INTO posts ( post_id, title, date, link, author ) VALUES ( @id, @title, @date, @link, @author )")
    const insertMany = db.transaction((posts) => {
        for (const post of posts) {
            post.date = Math.floor(post.date.getTime() / 1000)
            insert.run(post)
        }
    })
    insertMany(posts)
}

export function insertPostContent(db, id, paragraphs) {
    const textContent = paragraphs.join("\n")
    const insert = db.prepare("INSERT OR IGNORE INTO posts_content ( post_id, content ) VALUES ( ?, ? )")
    insert.run(id, textContent)
}

export function getPosts(db, count) {
    const posts = db.prepare("SELECT * FROM posts ORDER BY date DESC LIMIT ?").all(count)
    return posts
}

export function getPost(db, postId) {
    const post = db.prepare("SELECT * FROM posts WHERE post_id = ?", postId).get(postId)
    return post
}

export function getPostContent(db, postId) {
    const post = db.prepare("SELECT * FROM posts_content WHERE post_id = ?", postId).get(postId)
    if (!post) {
        return undefined
    }
    return post.content.split("\n")
}
