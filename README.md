# Full Stack Developer Roadmap — 3 Months

Working repository for a twelve-week roadmap: HTML and CSS foundations,
then JavaScript, React, Node, Express and MongoDB.

Everything here is written by hand. No frameworks, no build step, no
generators — until the roadmap introduces them.

## Layout

```
week 1/   HTML and CSS foundations
  day2/   Personal bio page — structure, text, links, images, lists, tables
  day3/   Contact form — forms and semantic tags
  day4/   The bio page, styled — selectors, colours, fonts, units, box model
  day5/   Navbar + card row — display, position, Flexbox
  day6/   Build day — the finished, styled page
  docs/   Notes for each day
  client/ server/   An Express server, so day 1's HTTP lesson is visible

week 2/   Responsive design and Git
  day1/   Photo gallery — CSS Grid
  day2/   The gallery made responsive — media queries, mobile-first
  day3/   Polished buttons and cards — transitions, hover, CSS variables
  docs/   Notes for each day
```

## Running anything

Every page is plain HTML and CSS. Open the `index.html` you want:

```bash
open "week 2/day3/index.html"
```

The only part that needs a runtime is the Express server in `week 1/server`,
which requires Node 18+:

```bash
cd "week 1" && npm install && npm start
```

## Progress

| Week | Focus | Status |
|---|---|---|
| 1 | How the web works, HTML and CSS | Complete |
| 2 | Responsive design and Git | In progress |
| 3–4 | JavaScript, DOM, async | — |
| 5–6 | React | — |
| 7–8 | Node, Express, databases | — |
| 9–12 | Auth, integration, deployment, capstone | — |
