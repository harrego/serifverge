# serifverge
Basic web version of The Verge - [apps.harry.city/verge](http://apps.harry.city/verge)

## Disclaimer
This website is not affiliated, associated, authorized, endorsed by, or in any way officially connected with the The Verge, or any of its subsidiaries or its affiliates.

## Acknowledgments
Made with appreciation for both [The Verge](https://theverge.com) team and [68k.news](http://68k.news). Thanks to The Verge for great coverage, thanks to 68k.news for the inspiration and site layout.

![Screenshot preview of serifverge](https://raw.githubusercontent.com/harrego/serifverge/main/.github/screenshot1.png)

## Behavior

When running `serifverge` will fetch new posts from The Verge's RSS feed every 30 minutes. When a link is visited by a user for the first time it will fetch it from The Verge site, remove everything but the text, and then cache it in the database for all future visits.

## Usage

1. Install all dependencies: `npm i`
2. Run and specify the port: `PORT=80 node index.js`

There is also a bundled Dockerfile, specify the port through the environment variable `PORT`. You can optionally map the SQLite database to your physical drive with `-v $PWD/serifverge.sqlite:/usr/src/app/serifverge.sqlite`.
