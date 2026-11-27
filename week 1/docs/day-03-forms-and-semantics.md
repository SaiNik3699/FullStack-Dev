# Day 3 — Forms and semantic tags

**Week 1 · Wednesday**

| | |
|---|---|
| **Learn** | HTML forms and semantic tags |
| **Build** | A contact form with a semantic layout |
| **Code** | `day3/index.html` |
| **Rule for today** | Still no CSS. That is tomorrow. |

> Today's two topics look unrelated but share one idea: **markup carries meaning, not appearance.** A `<section>` and a `<div>` look identical. A labelled input and an unlabelled one look identical. The difference only shows up for the people and machines that cannot see your page.

---

## 1 · Semantic tags — meaning, not appearance

Here is the uncomfortable truth about every tag you learn today:

```
<header>  <nav>  <main>  <section>  <article>  <aside>  <footer>

     ALL OF THEM RENDER EXACTLY LIKE A <div>.
```

No borders, no colours, no layout. Zero visual difference. So why bother?

| Who | What they gain |
|---|---|
| **Screen-reader users** | Jump straight between landmarks — "skip to main content" works |
| **Search engines** | Understand which part of the page is the actual content |
| **You, in six months** | `</section>` tells you what just closed. `</div>` tells you nothing |
| **Browsers** | Reader mode, and "save for later" tools, find the real article |

A page built from `<div>`s is not broken. It is just mute.

---

## 2 · The four landmarks

```
+----------------------------------------------------+
|  <header>                                          |
|     site title, and usually the <nav> inside it    |
|  +----------------------------------------------+  |
|  |  <nav>   the block of MAJOR links            |  |
|  +----------------------------------------------+  |
+----------------------------------------------------+
|  <main>                                            |
|     the ONE block of content unique to this page   |
|     - exactly one per page                         |
|     - never inside header, nav, article, aside     |
|       or footer                                    |
+----------------------------------------------------+
|  <footer>                                          |
|     authorship, copyright, closing links           |
+----------------------------------------------------+
```

| Tag | Rules worth remembering |
|---|---|
| `<header>` | Introductory content. You may have **several** — one per section — this one just happens to be the page's |
| `<nav>` | **Major** navigation only. A list of citations is not a nav. Add `aria-label` when a page has more than one |
| `<main>` | **Exactly one.** Must not sit inside `header`, `nav`, `article`, `aside` or `footer`. This is what "skip to main content" targets |
| `<footer>` | Closing information for its nearest section — or for the page, when it sits at the top level |

---

## 3 · section vs article vs div — how to choose

This is the decision people get wrong most often. One question settles it:

```
Does this content still make sense if you
lifted it out and published it somewhere else?
                  |
         +--------+--------+
        YES               NO
         |                 |
     <article>     Does it have a heading,
                   and is it a theme?
                          |
                  +-------+-------+
                 YES             NO
                  |               |
              <section>        <div>
```

| Tag | Use for | Examples |
|---|---|---|
| `<article>` | Stands alone | A blog post, a product card, a comment, a FAQ entry |
| `<section>` | A themed group, **normally with a heading** | "About me", "Contact", "Projects" |
| `<div>` | **No meaning at all** | A wrapper you need purely for styling |

**`<div>` is not forbidden.** It is the right answer when you genuinely need a box with no meaning — usually a styling hook. The mistake is reaching for it *first*.

**Rule of thumb:** if a `<section>` has no heading, you probably wanted a `<div>`.

---

## 4 · The supporting four

| Tag | For | The catch |
|---|---|---|
| `<aside>` | Related, but not essential — a sidebar, a pull quote | If the page breaks without it, it is not an aside |
| `<figure>` + `<figcaption>` | Self-contained illustration with a caption | The caption goes **first or last** inside the figure, nowhere else |
| `<address>` | Contact details **for the nearest article, or the page** | **Not** for postal addresses in general. A shipping address in a table is just a table cell |
| `<time datetime="...">` | A machine-readable date, time or duration | The attribute is what machines read; the text is what humans read |

```html
<time datetime="2026-11-17">today</time>
<time datetime="PT24H">24 hours</time>     P = period, T = time, so PT24H
<time datetime="P3D">three days</time>     P3D = a period of 3 days
```

---

## 5 · Forms — where the data goes, and how

```html
<form action="index.html" method="get">
```

| Attribute | Means |
|---|---|
| `action` | **Where** the data goes — a URL |
| `method` | **How** it travels |

### GET vs POST

| | `GET` | `POST` |
|---|---|---|
| Data goes in | The **URL**, as a query string | The request **body** |
| Visible? | Yes — in the address bar | No |
| Bookmarkable? | Yes | No |
| Length limit? | Yes, around 2000 characters | Effectively none |
| Use for | Searches, filters, anything repeatable | Logins, payments, anything private or large |

Your Day 3 page uses `GET` back to its own page **on purpose** — submit it and your answers appear in the address bar:

```
index.html?name=Nikhil&email=a%40b.co&topic=hiring&urgency=today
```

That *is* the HTTP request from Monday's diagram, made visible. In Week 7 an Express `POST` route replaces it.

> Notice `%40`. That is **URL encoding** — the `@` cannot travel literally in a URL, so it becomes its hex code. Spaces become `+` or `%20`.

---

## 6 · Labels — the rule that matters most

Every single control needs a label. Two ways to do it:

```html
<!-- 1. for / id pairing -->
<label for="email">Email</label>
<input type="email" id="email" name="email" />

<!-- 2. wrapping - no for/id needed at all -->
<label>
  <input type="checkbox" name="consent" />
  I agree to be contacted
</label>
```

`for` must **exactly** equal `id`. That pairing does two things:

1. Clicking the label focuses the input — a much bigger target, which matters enormously on a phone
2. A screen reader announces *which* text describes *which* box

### A placeholder is not a label

```html
<input type="email" placeholder="Email" />     WRONG - no label at all
```

A placeholder disappears the moment someone types. Then they scroll back, and nothing on screen says what the field was. Some screen readers ignore placeholders entirely. **Use both:** a label for what the field is, a placeholder for an example of the format.

### name vs id

| Attribute | Who uses it |
|---|---|
| `id` | The **browser** — links `<label for>` to the input |
| `name` | The **server** — this is the key the value arrives under |

An input with no `name` is not submitted at all. That is the silent one.

---

## 7 · Input types

`type` changes three things at once: what the field accepts, what keyboard a phone shows, and what the browser validates.

| Type | Gives you |
|---|---|
| `text` | Plain text — the default |
| `email` | Format checking + an email keyboard on phones |
| `tel` | A numeric keypad. **No format checking** — use `pattern` |
| `url` | Requires a full URL including `https://` |
| `number` | Spinner, numeric keypad, `min` / `max` / `step` |
| `date` | A native date picker |
| `password` | Masked characters |
| `search` | A clear "x" button in most browsers |
| `file` | A file picker; `accept=".pdf,.docx"` narrows it |
| `checkbox` | Independent yes/no. **Unchecked sends nothing at all** |
| `radio` | One from a group — grouped by sharing the same `name` |
| `hidden` | Submitted but invisible. **Never secret** — View Source shows it |

Then the three that are not `<input>` at all:

```html
<select>      more than about five fixed choices; <optgroup> groups them
<textarea>    multi-line. Its value goes BETWEEN the tags, never in value=""
<datalist>    suggestions, while still allowing any text
```

---

## 8 · Grouping — fieldset and legend

```html
<fieldset>
  <legend>How soon do you need a reply?</legend>
  <label><input type="radio" name="urgency" value="today" /> Today</label>
  <label><input type="radio" name="urgency" value="week" /> This week</label>
</fieldset>
```

`<fieldset>` groups related controls; `<legend>` names the group. A screen reader reads the legend **before each field inside it**, so the user hears *"How soon do you need a reply? Today, radio button"* instead of a bare "Today".

**This is close to mandatory for radio groups.** Without a legend, the individual labels have no context at all.

---

## 9 · Native validation — and its two traps

The browser validates for you, with no JavaScript:

| Attribute | Checks |
|---|---|
| `required` | Not empty |
| `minlength` / `maxlength` | Character count |
| `min` / `max` / `step` | Numeric and date range |
| `pattern` | A regular expression the **whole** value must match |
| `type` | Format, for `email`, `url`, `number`, `date` |
| `title` | The message shown when `pattern` fails |

### Trap 1 — a broken pattern is silently ignored

Browsers compile `pattern` with the regex **`v` flag**, where `( ) - [ ] { }` are syntax characters that **must be escaped inside a character class**.

```html
pattern="[+]?[0-9 ()-]{7,20}"         BROKEN - fails to compile
pattern="[+]?[0-9 \(\)\-]{7,20}"      CORRECT
```

When the pattern fails to compile the browser **ignores the attribute entirely** — no console error, no warning — and the field happily accepts `abc!!!`. The only way to catch this is to **test a value you expect it to reject.**

### Trap 2 — minlength only counts user typing

`minlength` and `maxlength` apply only once the value has been changed **by the user**. Set the value from JavaScript and the browser reports it valid however short it is. Type the same text by hand and it is correctly rejected.

So **test forms by typing in them**, not by scripting them. Otherwise you will "prove" a rule works when it never ran.

### And the one that is not a trap, but the point

> Client-side validation is **user experience**. Server-side validation is **security**.

Anyone can open DevTools and delete `required`. That is Monday's lesson again: the client is never trustworthy. From Week 7 you will validate everything a second time on the server — and that is the one that counts.

---

## 10 · Mistakes you will make at least once

| Symptom | Cause | Fix |
|---|---|---|
| Field value never reaches the server | No `name` attribute | Add `name` — `id` alone is not enough |
| Clicking the label does nothing | `for` does not match an `id` | Make them identical |
| Radio buttons all selectable at once | Different `name` values | Give every radio in a group the **same** `name` |
| A button submits when you did not want it to | No `type` | `type="button"` — the default is `submit` |
| `pattern` accepts anything | It failed to compile | Escape `( ) -` inside the class |
| Checkbox value missing on the server | It was unchecked | Unchecked boxes send nothing; handle the absence |
| Screen reader reads "edit text, blank" | Placeholder used as a label | Add a real `<label>` |
| Two `<main>` elements | — | There may be only one |
| `<section>` with no heading | It was never a section | Use a `<div>` |
| `<address>` used for a shipping address | It is only for contact details of the page or article | Use a `<p>` or a table cell |

---

## 11 · Check yourself

Close these notes and answer out loud:

1. What is the visual difference between `<section>` and `<div>`?
2. What single question decides `<article>` vs `<section>`?
3. How many `<main>` elements may a page have, and where can it not go?
4. Where does `GET` put the data? Where does `POST`?
5. What are the two ways to attach a label to an input?
6. Why is a placeholder not a label?
7. What is the difference between `name` and `id`?
8. How are radio buttons grouped?
9. What happens when a `pattern` fails to compile?
10. Why is client-side validation not security?

---

## 12 · Today's deliverable

- [ ] A contact page at `day3/index.html`
- [ ] Uses `header`, `nav`, `main`, `section`, `aside`, `figure`, `address`, `time`, `footer`
- [ ] Exactly one `<main>`, exactly one `<h1>`
- [ ] A form with `action` and `method`
- [ ] **Every** control has a real `<label>`
- [ ] At least six input types
- [ ] Radios grouped inside a `<fieldset>` with a `<legend>`
- [ ] Validation with `required`, and one `pattern`
- [ ] **Zero CSS, zero JavaScript**

**Then do this:** fill the form in and submit it. Watch your answers appear in the address bar as a query string. Then empty a required field and submit again — the browser stops you, with a message you never wrote.

---

**Tomorrow — Day 4:** CSS at last. Selectors, colours, fonts, units, and the box model. The same markup you wrote today finally stops looking like a 1995 document.
