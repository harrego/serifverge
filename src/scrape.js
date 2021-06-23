import bent from "bent"
import createDOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { Readability } from "@mozilla/readability"

// Return an array of paragraphs from the post
export async function scrapePost(url) {
    const req = bent({
        // Chrome 91.0 on Windows 10
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"
    })
    const stream = await req(url)
    const text = await stream.text()
    const dom = new JSDOM(text)

    const DOMPurify = createDOMPurify(dom.window)
    const cleanDomText = DOMPurify.sanitize(dom.window.document.body)
    const cleanDom = new JSDOM(cleanDomText)

    const article = new Readability(cleanDom.window.document).parse()
    const clean = article.textContent.split("\n").flatMap(item => {
        if (/^(\s+)?$/g.test(item)) {
            return []
        }
        return [item.trim()]
    })
    return clean
}
