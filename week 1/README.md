# Week 1 — How the web works, HTML and CSS basics

Month 1 of the **Full Stack Developer Roadmap — 3 Months**.
Everything here is written by hand: no frameworks, no CSS libraries, no build step.

The folders are laid out as a **MERN monorepo from day one**, so nothing has to move later — React lands in `client/` in Week 5, Mongoose lands in `server/` in Week 8.

---

## Quick start

**No install needed for the HTML/CSS work.** Just open `client/index.html` in your browser — every lesson from Tuesday to Sunday works this way.

To run the Express server as well (recommended for Monday's lesson — it's how you *watch* HTTP requests happen), you need Node.js 18+:

```bash
node --version
```

If that prints a version, you're set:

```bash
npm install && npm start
```

If it says `command not found`, install Node first:

```bash
brew install node
```

Then open <http://localhost:3000>.

> **No Node and don't want it yet?** Python serves the same pages, minus the `/api` routes:
> ```bash
> python3 -m http.server 4173 --directory client
> ```

| URL | What it is |
|---|---|
| `/` | The finished bio page (Sat) |
| `/contact.html` | Contact form + semantic layout (Wed) |
| `/steps/day-02-bio-html-only.html` | The same page with **no CSS** (Tue) |
| `/steps/day-05-flexbox-playground.html` | Interactive Flexbox + box model demos (Fri) |
| `/api/profile` | JSON from the Express server |
| `/api/health` | Is the server alive? |
| `/docs/day-01-how-the-web-works.md` | Day 1 notes (Mon) |

> **You don't strictly need the server.** Double-clicking `client/index.html` works fine for the HTML/CSS lessons. Run the server when you want to *watch* HTTP requests happen — which is the entire point of Day 1.

---

## Day by day

| Day | Learn | Build | Files |
|---|---|---|---|
| **Mon** | Client, server, HTTP, DNS; frontend vs backend; VS Code | Notes + request diagram | [`docs/day-01-how-the-web-works.md`](docs/day-01-how-the-web-works.md) · [`docs/web-request-diagram.svg`](docs/web-request-diagram.svg) |
| **Tue** | HTML structure, headings, text, links, images, lists, tables | Personal bio page | [`client/steps/day-02-bio-html-only.html`](client/steps/day-02-bio-html-only.html) |
| **Wed** | HTML forms and semantic tags | Contact form + semantic layout | [`client/contact.html`](client/contact.html) · [`client/css/components/form.css`](client/css/components/form.css) |
| **Thu** | CSS selectors, colours, fonts, units, box model | Style the bio page | [`client/css/base/`](client/css/base/) |
| **Fri** | `display`, `position`, Flexbox | Navbar + card row | [`client/css/layout/layout.css`](client/css/layout/layout.css) · [`client/css/components/navbar.css`](client/css/components/navbar.css) · [`client/css/components/card.css`](client/css/components/card.css) |
| **Sat** | Build day | Finished, styled bio page | [`client/index.html`](client/index.html) |
| **Sun** | Revision | Box model + Flexbox recap | [`docs/day-07-revision.md`](docs/day-07-revision.md) |

A **day-by-day slide deck** lives in [`presentation/week-1-presentation.html`](presentation/week-1-presentation.html) — open it in any browser. Arrow keys or Space to move, `Home`/`End` to jump to the ends, `P` to print all 12 sheets, and the tick bar at the bottom jumps to any sheet. It follows your system light/dark setting: ink-on-drafting-paper in light, a proper blueprint in dark.

---

## Project structure

```
week 1/
├── client/                      FRONTEND — plain HTML/CSS now, React from Week 5
│   ├── index.html               Sat: the finished bio page
│   ├── contact.html             Wed: form + semantic layout
│   ├── steps/                   Day-by-day snapshots, kept on purpose
│   │   ├── day-02-bio-html-only.html      Tue: the bio page, zero CSS, 38 elements
│   │   └── day-05-flexbox-playground.html Fri: interactive demos
│   ├── css/
│   │   ├── main.css             The only file the HTML links to
│   │   ├── base/                reset · variables · typography · a11y
│   │   ├── layout/              container, sections, hero, columns
│   │   └── components/          navbar · button · card · badge · table · form · footer
│   ├── js/
│   │   └── request-demo.js      Week 4 preview: narrates one HTTP round trip
│   └── assets/                  avatar.svg, favicon.svg, cv.pdf (placeholder)
│
├── server/                      BACKEND — the E and N of MERN
│   ├── server.js                Entry point; reads top to bottom like a request
│   ├── config/env.js            Every environment variable, one place
│   ├── routes/                  URL → handler, and nothing else
│   ├── controllers/             Read the request, send the response
│   ├── services/                Fetch the data (becomes Mongoose in Week 8)
│   ├── middleware/              logger · notFound · errorHandler
│   └── data/profile.json        Becomes a MongoDB collection in Week 8
│
├── docs/                        Monday's and Sunday's written deliverables
├── presentation/                The day-by-day slide deck
├── .env.example                 Copy to .env
└── package.json
```

### Why `client/` and `server/` already?

Week 1 doesn't need a backend. But this structure is the one the roadmap arrives at by Week 10, and setting it up now means the later weeks are **additions, never reorganisations**:

| Week | What changes | What moves |
|---|---|---|
| 5 | React + Vite inside `client/` | Nothing |
| 7 | More routes and controllers in `server/` | Nothing |
| 8 | `services/` reads Mongoose instead of a JSON file | Nothing |
| 9 | Add `middleware/auth.js`, `routes/auth.routes.js` | Nothing |
| 12 | Deploy `client/` to Vercel, `server/` to Render | Nothing |

The split between **route → controller → service** is the part worth internalising. Each layer knows one thing:

```
routes/       "which URL am I?"        — no logic
controllers/  "read req, send res"     — no data access
services/     "fetch or change data"   — no HTTP at all
```

That's why swapping a JSON file for MongoDB in Week 8 touches exactly one file.

---

## What's deliberately *not* here

Staying inside Week 1's scope matters — these all arrive on schedule:

| Not here | Arrives |
|---|---|
| Media queries, responsive breakpoints | Week 2 |
| CSS Grid | Week 2 |
| Git repo (run `git init` yourself on Thursday of Week 2) | Week 2 |
| Real JavaScript behaviour | Weeks 3–4 |
| React components | Week 5 |
| A real database | Week 8 |

The card row and the two-column form layout *do* adapt to narrow screens — but with `flex-wrap`, not media queries. That's Week 1 material doing Week 2's job, which is a nice thing to notice.

---

## Things worth opening DevTools for

1. **Network tab, then reload.** Every row is one HTTP request. Count them — a single page is never a single request.
2. **Elements tab → any element → the box model diagram** in the right-hand panel. Hover each layer and watch it highlight on the page.
3. **The flex badge.** In the Elements panel, any `display: flex` element gets a little `flex` chip. Click it to overlay the axes on the page.
4. **Console tab.** `request-demo.js` prints the full round trip.
5. **Break something on purpose.** Delete `box-sizing: border-box` from `reset.css` and reload. The whole layout drifts — that's Thursday's lesson in one keystroke.

---

## Checklist before moving to Week 2

- [ ] I can explain what DNS returns and why
- [ ] I know the difference between `401` and `403`
- [ ] I can write a page using only semantic tags, no stray `<div>`s
- [ ] Every form input of mine has a real `<label>`
- [ ] I can predict an element's rendered width from `width`, `padding` and `border`
- [ ] I know which axis `justify-content` works on, and why that changes
- [ ] I can build a navbar and a wrapping card row from memory
- [ ] I never write `outline: none` without replacing the focus ring

---

## Resources

- [MDN Web Docs](https://developer.mozilla.org/) — the reference, not a tutorial
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) — the one everyone bookmarks
- [Flexbox Froggy](https://flexboxfroggy.com/) — 24 levels, ~30 minutes, genuinely effective
- [The Odin Project](https://www.theodinproject.com/) — the free full path
- [web.dev/learn/html](https://web.dev/learn/html/) and [web.dev/learn/css](https://web.dev/learn/css/)
