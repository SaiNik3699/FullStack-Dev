# Day 4 — CSS: selectors, colours, fonts, units, the box model

**Week 1 · Thursday**

| | |
|---|---|
| **Learn** | CSS: selectors, colours, fonts, units, the box model |
| **Build** | Style the bio page |
| **Code** | `day4/index.html` and `day4/style.css` |
| **Rule for today** | No `display`, no `position`, no Flexbox. That is Friday. |

> The `<body>` of today's page is **byte-for-byte identical** to Tuesday's. One `<link>` tag is the only change to the markup. Everything else you see is one stylesheet — which is the whole lesson.

---

## 1 · What CSS actually does

The mistake almost everyone makes on day one: thinking CSS *creates* the look of a page.

It does not. **The browser already has a stylesheet.** That is where the big bold `<h1>`, the blue underlined links, the bullets on your lists and the borders on your tables come from. Tuesday's page proved it.

> **CSS does not create those things. It overrides them.**

That is why Tuesday had to come before Thursday. You cannot tell what you are changing until you have seen the default.

---

## 2 · Three ways to attach CSS

```html
<!-- 1. INLINE — on the element itself -->
<p style="color: teal;">Avoid this.</p>

<!-- 2. INTERNAL — a <style> block in the head -->
<style>
  p { color: teal; }
</style>

<!-- 3. EXTERNAL — a separate file. Use this. -->
<link rel="stylesheet" href="style.css" />
```

| Method | Problem |
|---|---|
| Inline | Styles one element only, cannot be reused, beats almost everything in specificity, and cannot do `:hover` |
| Internal | Fine for one page. Useless across five |
| **External** | One file, every page. Cached by the browser. **The right answer** |

---

## 3 · The anatomy of a rule

```
selector  {  property : value ;  }
   |            |        |
   |            |        +-- what to set it to
   |            +----------- what to change
   +------------------------ what to change it on

h1 {
  color: teal;          <- one declaration
  font-size: 2rem;      <- another. Semicolons separate them.
}
```

The semicolon after the **last** declaration is optional — but add it anyway. The day you append another line and forget it, the rule silently breaks.

---

## 4 · Selectors — the full tour

### The three basics

```css
h1        { }    /* element — every <h1> on the page        */
.card     { }    /* class   — every element class="card"    */
#about    { }    /* id      — the ONE element id="about"     */
```

Use **classes** for styling. Ids are for anchors and JavaScript — styling with them causes specificity fights you will lose.

### Attribute selectors

Match on an attribute's value. These are why your bio page needed no classes:

```css
a[href]            { }   /* has the attribute at all     */
a[target="_blank"] { }   /* exactly                      */
a[href^="mailto:"] { }   /* STARTS with   ^ like regex   */
a[href$=".pdf"]    { }   /* ENDS with     $ likewise     */
a[href*="github"]  { }   /* CONTAINS                     */
```

### Pseudo-classes — a state, not an element

| Selector | Matches |
|---|---|
| `:hover` | While the pointer is over it |
| `:focus-visible` | Focused **via keyboard** — the modern focus ring |
| `:first-child` / `:last-child` | First or last among its siblings |
| `:nth-child(even)` | Every second one — zebra stripes, free |
| `:not(x)` | Everything except x |

### Pseudo-elements — a generated sub-part

| Selector | Styles |
|---|---|
| `::before` / `::after` | Content generated before or after. Needs `content:` |
| `::marker` | A list item's bullet or number, on its own |
| `::selection` | Text the user has highlighted |

Two colons, by convention, to tell them apart from pseudo-classes.

### Combinators

```css
A B   { }   /* descendant — any B inside A, at any depth     */
A > B { }   /* child      — only a DIRECT child              */
A + B { }   /* adjacent   — the B immediately after an A     */
A ~ B { }   /* sibling    — any B after A, same parent       */
```

`p + p` is the one you will use most: spacing **between** paragraphs, never before the first.

---

## 5 · Specificity and the cascade

When two rules set the same property, the more **specific** one wins:

```
            weakest  ----------------------------->  strongest

  element      class/attr/        id          inline      !important
  h1           pseudo-class       #about      style=""    color: red !important
  (0,0,0,1)    .card (0,0,1,0)    (0,1,0,0)   (1,0,0,0)   nuclear
```

Two rules of equal specificity? **The one written last wins.** That is the "cascade" in Cascading Style Sheets.

**Keep selectors shallow.** `.card h3` beats `section div article h3` every time — easier to read, faster, and it does not break when someone moves the markup.

**`!important` is not a tool, it is a symptom.** If you need it, something upstream is too specific.

---

## 6 · Colours

Four notations for the same colour — they are interchangeable:

```css
color: #0d7d74;                  /* hex — most common            */
color: rgb(13 125 116);          /* red / green / blue           */
color: hsl(175 81% 27%);         /* hue / saturation / lightness */
color: rgb(13 125 116 / 50%);    /* the slash adds transparency  */
```

**HSL is the one worth learning properly.** Want a darker version of a colour? Drop the lightness. With hex you have to guess at three numbers.

```css
--accent:      hsl(175 81% 27%);
--accent-dark: hsl(175 81% 19%);   /* same hue, less light */
```

Also useful: `currentColor` means "whatever this element's `color` is", so a border always matches its text without repeating the value.

**Name colours by their ROLE, never their appearance.** `--accent` survives a redesign; `--teal` becomes a lie the moment you change it to orange.

---

## 7 · Fonts and typography

```css
font-family: Georgia, "Times New Roman", Times, serif;
```

That is a **stack**, not a font. The browser tries each in turn. **Always end with a generic family** — `serif`, `sans-serif`, `monospace` — so there is always a fallback.

`system-ui` means "whatever this operating system uses": San Francisco on a Mac, Segoe UI on Windows. No download, no layout shift.

| Property | Notes |
|---|---|
| `font-size` | Use `rem`, so it respects the user's font-size setting |
| `font-weight` | 400 normal, 700 bold. Numbers give finer control than `bold` |
| `font-style` | `italic` |
| `line-height` | **Use a unitless number.** `1.65`, not `1.65rem` |
| `letter-spacing` | Large headings look loose; `-0.02em` tightens them |

### Why unitless line-height matters

```css
body { font-size: 16px; line-height: 1.5;    }   /* children compute 1.5x
                                                    THEIR OWN size      */
body { font-size: 16px; line-height: 24px;   }   /* children inherit 24px
                                                    however big they are */
```

The second is a classic subtle bug: a 32px heading inherits a 24px line-height and its lines overlap.

---

## 8 · Units

| Unit | Relative to | Reach for it when |
|---|---|---|
| `px` | Nothing — fixed | Hairline borders, shadows. Things that should **not** scale |
| `rem` | The **root** font size (16px default) | Nearly everything: text, padding, margins |
| `em` | The **current element's** font size | Padding that should scale with its own text |
| `%` | The **parent** | Widths inside a container |
| `ch` | The width of one "0" | Line length — `68ch` is about 68 characters |
| `vw` / `vh` | 1% of the viewport | Full-height heroes, fluid type |

### The em trap

`em` **compounds** when nested. `rem` never does.

```
body       font-size: 16px
  div      font-size: 1.5em  ->  24px
    div    font-size: 1.5em  ->  36px   (1.5 x 24, not 1.5 x 16)
      div  font-size: 1.5em  ->  54px
```

Use `rem` for sizing, `em` only where you *want* that relationship.

### clamp() — fluid sizing, no media query

```css
font-size: clamp(1.75rem, 5vw, 2.75rem);
           /*   MINIMUM   ideal  MAXIMUM */
```

Never smaller than 1.75rem, never larger than 2.75rem, and scales with the window in between. Media queries arrive in Week 2; this covers a lot of ground before then.

---

## 9 · The box model

Every element is a rectangle of four nested layers:

```
   +-------------------------------------------+
   |  MARGIN         space OUTSIDE the border  |
   |  +-------------------------------------+  |
   |  |  BORDER       the visible edge      |  |
   |  |  +-------------------------------+  |  |
   |  |  |  PADDING   space INSIDE it    |  |  |
   |  |  |  +-------------------------+  |  |  |
   |  |  |  |  CONTENT  text, image   |  |  |  |
   |  |  |  +-------------------------+  |  |  |
   |  |  +-------------------------------+  |  |
   |  +-------------------------------------+  |
   +-------------------------------------------+
```

**Padding vs margin, in one line:** padding is *inside* the border so it takes the background colour; margin is *outside* so it is always transparent.

Bigger click target? Padding. Space between two things? Margin.

### box-sizing — the maths that catches everyone

```css
width: 300px;  padding: 20px;  border: 5px solid;
```

| `box-sizing` | Actual width | The sum |
|---|---|---|
| `content-box` *(browser default)* | **350px** | 300 + 20+20 + 5+5 |
| `border-box` *(what you want)* | **300px** | padding and border grow **inward** |

With `content-box` you asked for 300 and got 350. It is why three "33% wide" columns stop fitting the moment you add padding.

**One rule fixes it for the whole document:**

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

The `::before` and `::after` matter — pseudo-elements are boxes too, and they do not inherit it.

### Centring, with no Flexbox

```css
body {
  max-width: 54rem;
  margin-inline: auto;    /* splits the leftover space evenly */
}
```

Needs a width to work. `margin: 0 auto` on a full-width block does nothing, because there is no leftover space to split.

---

## 10 · Margin collapse

Two **vertical** margins that touch merge into one, and the bigger wins:

```
  element A    margin-bottom: 2rem
  element B    margin-top:    1rem
  actual gap   2rem   --  not 3rem
```

Horizontal margins never collapse. Neither do margins inside a flex or grid container — a quiet argument for `gap`, which arrives tomorrow.

It is a feature: it stops stacked paragraphs doubling their spacing. But it surprises everyone the first time.

---

## 11 · Custom properties

```css
:root {                     /* :root is the <html> element */
  --accent: #0d7d74;
}

a { color: var(--accent); }
h2 { border-bottom: 2px solid var(--accent); }
```

Change `--accent` once and every rule using it moves together. That is the entire argument.

`var()` takes a fallback for when the property is not defined:

```css
color: var(--accent, #0d7d74);
```

They are **not** the same as Sass variables: these are live in the browser, inherit down the tree, and can be changed at runtime.

---

## 12 · Mistakes you will make at least once

| Symptom | Cause | Fix |
|---|---|---|
| Boxes wider than you asked for | `content-box` | `box-sizing: border-box` on everything |
| Gap smaller than expected | Vertical margins collapsed | Use one side only, or `gap` tomorrow |
| `margin: 0 auto` does nothing | No width set | Add `max-width` |
| Heading lines overlap | `line-height` with units | Use a unitless number |
| Nested text keeps growing | `em` compounding | Use `rem` |
| A rule "does not work" | Something more specific wins | Inspect it in DevTools; do not reach for `!important` |
| Focus ring gone | Someone wrote `outline: none` | Replace it via `:focus-visible` |
| `::before` shows nothing | No `content` property | Add `content: ""` — it is required |
| Styles apply to the wrong things | `A B` where you meant `A > B` | Descendant matches at any depth |
| Font falls back to Times | No generic family at the end of the stack | End with `serif` / `sans-serif` |

---

## 13 · Check yourself

1. What does CSS actually do to the browser's own stylesheet?
2. Name the three ways to attach CSS, and why external wins.
3. What is the difference between `A B` and `A > B`?
4. Which is more specific: a class or an id?
5. When two rules have equal specificity, which wins?
6. Why is HSL easier to work with than hex?
7. What is wrong with `line-height: 24px` on the body?
8. Why does `em` compound but `rem` not?
9. `width: 300px; padding: 20px; border: 5px` — how wide, by default?
10. Why must `box-sizing` also target `::before` and `::after`?

---

## 14 · Today's deliverable

- [ ] `day4/style.css`, linked from the bio page with one `<link>` tag
- [ ] The HTML otherwise **unchanged** from Tuesday
- [ ] `box-sizing: border-box` applied to everything
- [ ] Colours in custom properties on `:root`, named by role
- [ ] A font stack ending in a generic family
- [ ] At least one each of `rem`, `em`, `%` and `ch`
- [ ] Element, class/attribute, pseudo-class and pseudo-element selectors
- [ ] A visible focus style via `:focus-visible`
- [ ] **No `display`, no `position`, no Flexbox** — that is tomorrow

**Then do this:** open DevTools, click any element, and look at the box-model diagram in the right-hand panel. Hover each layer — content, padding, border, margin — and watch it highlight on the page. Then delete `box-sizing: border-box` from your stylesheet and reload. The whole layout drifts. That is Thursday's lesson in one keystroke.

---

**Tomorrow — Day 5:** `display`, `position` and Flexbox. A navbar with the brand hard left and links hard right, and a row of cards that wraps on its own — with no media query in sight.
