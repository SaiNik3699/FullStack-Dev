# Day 2 — HTML: structure, text and tables

**Week 1 · Tuesday**

| | |
|---|---|
| **Learn** | HTML: structure, headings, text, links, images, lists, tables |
| **Build** | A personal bio page |
| **Code** | `day2/index.html` |
| **Rule for today** | No CSS. Not one line. |

> Everything you see on today's page — heading sizes, blue underlined links, bullets, table borders — comes from the browser's **own default stylesheet**. CSS does not create those things. It overrides them. Seeing the "before" is the whole point of Tuesday.

---

## 1 · Structure — the shape of every document

Every HTML page, without exception, has this skeleton:

```
<!DOCTYPE html>          tells the browser "modern HTML, standards mode"
<html lang="en">         the root. lang helps screen readers and translation
  |
  +-- <head>             information ABOUT the page. Nothing here is visible.
  |     <meta charset>     how to decode the bytes. ALWAYS FIRST.
  |     <meta viewport>    use the phone's real width
  |     <meta description> what Google and link previews show
  |     <title>            the browser tab
  |
  +-- <body>             everything a visitor actually sees
        <h1> <p> <img> <ul> <table> ...
</html>
```

The smallest complete document:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Page title</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

### The four meta tags worth knowing

| Tag | Why |
|---|---|
| `<meta charset="UTF-8">` | Makes é — ₹ render instead of turning to mojibake. Must be first, inside the first 1024 bytes |
| `<meta name="viewport" ...>` | Without it a phone pretends to be a 980px desktop and shrinks everything |
| `<meta name="description">` | What Google shows under your link, and what chat apps preview |
| `<meta name="author">` | Who wrote it |

**The mental model:** `<head>` is the label on the tin. `<body>` is what's inside.

---

## 2 · Headings — an outline, not font sizes

`<h1>` through `<h6>`. Three rules:

1. **Exactly one `<h1>` per page.** It is the page's title.
2. **Never skip a level.** `h2` then `h4` is a broken outline.
3. **They are not font sizes.** Wanted smaller text? That's CSS, on Thursday.

Why it matters: a screen-reader user navigates a page by jumping between headings. A broken outline is a broken map. Your headings are the table of contents whether you meant them to be or not.

```html
<h1>Rudraraju Sai Nikhil Varma</h1>     the page title - once
  <h2>About me</h2>                     a major section
  <h2>Technical skills</h2>
  <h2>Projects</h2>
    <h3>Account Management Application</h3>   a project within Projects
    <h3>Transactional Message Broker</h3>
```

---

## 3 · Text — the inline tags

### Meaning, not appearance

| Tag | Means | Renders as |
|---|---|---|
| `<strong>` | This is **important** | Bold |
| `<b>` | Just make it bold | Bold |
| `<em>` | This carries *emphasis* | Italic |
| `<i>` | Just make it italic | Italic |

`<strong>` and `<em>` carry meaning — screen readers change their tone for them and say nothing for `<b>` and `<i>`. **Default to `<strong>` and `<em>`.** Reach for `<b>`/`<i>` only when you genuinely mean "look different, mean nothing".

### The rest

| Tag | For |
|---|---|
| `<p>` | A paragraph |
| `<abbr title="...">` | An abbreviation — the title is its expansion |
| `<q>` | A short inline quote. **The browser adds the quote marks** |
| `<blockquote cite="url">` | A longer quote. Put a `<p>` inside it |
| `<cite>` | The name of a work or source |
| `<mark>` | Highlighted for the reader here — a yellow highlighter |
| `<del>` / `<ins>` | Removed / inserted content |
| `<sup>` / `<sub>` | 1<sup>st</sup>, H<sub>2</sub>O |
| `<small>` | Fine print — not "make this smaller" |
| `<code>` | Computer code |
| `<hr>` | A thematic break between sections |
| `<br>` | A line break **inside** a paragraph — never to make space |

### Character entities

Some characters can't be typed literally, because HTML would read them as markup:

| Write | Get | Why |
|---|---|---|
| `&lt;` `&gt;` | `<` `>` | Otherwise the browser builds a tag |
| `&amp;` | `&` | It starts every entity |
| `&nbsp;` | a space | One that never breaks across lines |
| `&mdash;` | — | An em dash |
| `&copy;` | © | |

---

## 4 · Links — every kind

```html
<a href="https://example.com">absolute</a>          another site
<a href="about.html">relative</a>                   a file next to this one
<a href="../index.html">relative, up one</a>        .. goes up a folder
<a href="#skills">anchor</a>                        an id on this same page
<a href="mailto:you@example.com">email</a>          opens their mail client
<a href="tel:+919705215556">phone</a>               tappable on a phone
<a href="cv.pdf" download="my-cv.pdf">download</a>  saves instead of opening
```

### target and rel go together

```html
<a href="https://example.com"
   target="_blank"
   rel="noopener noreferrer">Opens in a new tab</a>
```

`target="_blank"` opens a new tab. **`rel="noopener noreferrer"` is the security habit that goes with it** — without it, the page you opened gets a handle back on yours and can redirect it.

### Relative paths

| Written | Means |
|---|---|
| `page.html` | Next to this file |
| `./page.html` | Same thing, said explicitly |
| `../page.html` | Up one folder, then that file |
| `assets/photo.jpg` | Into a subfolder |
| `/page.html` | From the **site root**, not this folder |

That last one is the one that catches people: a leading slash means the root of the whole site, which is usually not what you want on a local file.

---

## 5 · Images

```html
<img src="avatar.svg"
     alt="Illustrated avatar of Sai Nikhil"
     width="150" height="150" />
```

| Attribute | Why |
|---|---|
| `src` | Where the file is, relative to **this** file |
| `alt` | What the image **conveys**. Read aloud by screen readers; shown if the image fails |
| `width` / `height` | Reserve the space so the page doesn't jump as it loads |

### Alt text, properly

- **Meaningful image** → describe its purpose: `alt="Illustrated avatar of Sai Nikhil"`
- **Decorative image** → `alt=""` so screen readers skip it
- **Never omit the attribute** — then the screen reader reads the filename aloud

Do not write "image of" or "picture of". The screen reader already says it's an image.

### Formats

| Format | Use for |
|---|---|
| **SVG** | Logos, icons, diagrams. Scales to any size, tiny file |
| **JPG** | Photographs |
| **PNG** | Screenshots, anything needing transparency |
| **WebP** | A smaller modern replacement for both JPG and PNG |

---

## 6 · Lists — three kinds

| Element | Use when |
|---|---|
| `<ul>` | Order does **not** matter — skills, features |
| `<ol>` | Order **is** the information — steps, rankings |
| `<dl>` | Term and description pairs — a glossary, education |

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>

<ol reversed>            counts downward
  <li>Newest project</li>
  <li>Older project</li>
</ol>

<dl>
  <dt>Bachelor of Technology</dt>     the term
  <dd>VNIT, Nagpur</dd>              one description
  <dd>Graduated 2023</dd>            ...and another for the same term
</dl>
```

`<ol>` takes three attributes worth knowing: `start="3"`, `reversed`, and `type="a"` (also `A`, `i`, `I`, `1`).

### The nesting rule everyone gets wrong

A nested list goes **inside the `<li>` it belongs to**, before that `</li>` closes.

```html
<li>Backend                 CORRECT
  <ul>
    <li>Java</li>
  </ul>
</li>

<li>Backend</li>            WRONG - the <ul> is orphaned
<ul>
  <li>Java</li>
</ul>
```

---

## 7 · Tables

**A table is for data in rows and columns. Never for page layout** — that's Flexbox, on Friday.

### The parts, in the order they must appear

```
<table>
  <caption>    the table's title - keep it INSIDE the table
  <colgroup>   lets you address whole columns at once
  <thead>      the header row
  <tbody>      the data
  <tfoot>      a summary row - WRITE it after tbody, browsers SHOW it last
</table>
```

### th vs td, and scope

`<th>` is a header cell, `<td>` is a data cell. `scope` says what a header labels:

- `scope="col"` — this cell labels its whole **column**
- `scope="row"` — this cell labels its whole **row**

Without `scope`, a screen reader reads 24 disconnected cells. With it, it says *"Tuesday, Build: this page"*.

### The spans — and the off-by-one that breaks tables

```html
<tr>
  <th scope="row" rowspan="2">Trueblue</th>   covers THIS row and the next
  <td>Message Broker</td>
  <td>Baker Hughes</td>
  <td>Developer</td>
</tr>
<tr>
  <!-- no cell here - the rowspan above already fills this column -->
  <td>Account Management</td>
  <td>Pacific Life</td>
  <td>Developer</td>
</tr>
```

**This is where most broken tables come from.** A `rowspan="2"` means the row *below* it carries one **fewer** cell. Count every row's cells against the header, remembering the spans — every row must come to the same total.

`colspan="3"` works the same way sideways: one cell as wide as three columns.

### border="1"

It's a **legacy presentational attribute**. It's on today's page only so you can see the structure with no CSS. On Thursday you delete it and use a CSS border.

---

## 8 · Mistakes you will make at least once

| Symptom | Cause | Fix |
|---|---|---|
| Accented characters show as `Ã©` | No `<meta charset>` | Add it, first thing in `<head>` |
| Page is tiny on a phone | No viewport meta | Add it |
| Table columns don't line up | A `rowspan`/`colspan` miscount | Count cells per row against the header |
| Nested list renders oddly | `<ul>` placed between `<li>`s | Move it inside the `<li>` |
| Screen reader reads a filename | `<img>` with no `alt` | Add `alt`, or `alt=""` if decorative |
| Link goes nowhere | Wrong relative path | `..` up, `/` means site root |
| `<q>` shows doubled quote marks | You typed quotes too | Delete them — the browser adds them |
| `<tfoot>` appears in the middle | — | It's fine. Write it after `<tbody>`; browsers render it last |
| Page jumps while images load | No `width`/`height` | Add both |

---

## 9 · Check yourself

Close these notes and answer out loud:

1. What are the four parts of the HTML skeleton?
2. Why must `<meta charset>` come first?
3. What's the difference between `<strong>` and `<b>`?
4. When do you use `<ol>` instead of `<ul>`? And `<dl>`?
5. Where exactly does a nested `<ul>` go?
6. What does `rel="noopener noreferrer"` protect against?
7. What should `alt` say for a decorative image?
8. If a cell has `rowspan="3"`, how many cells do the next two rows carry?
9. What does `scope="row"` do?
10. Why is a table the wrong tool for page layout?

---

## 10 · Today's deliverable

- [ ] A personal bio page at `day2/index.html`
- [ ] Uses all seven: structure, headings, text, links, images, lists, tables
- [ ] Exactly one `<h1>`, and the outline never skips a level
- [ ] Every `<img>` has meaningful `alt` text
- [ ] At least one `<ul>`, one `<ol>` and one `<dl>`
- [ ] A table with `caption`, `thead`, `tbody`, `scope` — and a `rowspan` or `colspan`
- [ ] **Zero CSS.** Not one line, not one `style` attribute

**Then do this:** open the page, right-click, **View Page Source**. Everything you wrote is there in plain text — that is what the server sent and what the browser parsed. Nothing is hidden.

---

**Tomorrow — Day 3:** HTML forms and semantic tags. `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` — and a contact form the browser validates for you, with no JavaScript.
