# Day 7 — Revision: the box model and Flexbox

**Week 1 · Sunday** — no new material. Just the two things that cause the most confusion, until they don't.

Open [`day-05-flexbox-playground.html`](../client/steps/day-05-flexbox-playground.html) alongside this page and change values as you read.

---

## Part 1 — The box model

Every element on a page is a rectangle made of four nested layers:

```
┌─────────────────────────────────────────────┐
│  MARGIN          space outside the border   │
│  ┌───────────────────────────────────────┐  │
│  │  BORDER       the visible edge        │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  PADDING   space inside border  │  │  │
│  │  │  ┌───────────────────────────┐  │  │  │
│  │  │  │  CONTENT   text, image    │  │  │  │
│  │  │  └───────────────────────────┘  │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**Padding vs margin, the one-line rule:** padding is *inside* the border so it takes the background colour; margin is *outside* so it's always transparent. Want more clickable area? Padding. Want more space between two things? Margin — or better, `gap`.

### `box-sizing` — the whole reason this trips people up

```css
.box {
  width: 300px;
  padding: 20px;
  border: 5px solid;
}
```

| `box-sizing` | Actual width on screen | Maths |
|---|---|---|
| `content-box` *(browser default)* | **350px** | 300 + 20×2 + 5×2 |
| `border-box` *(what we set)* | **300px** | padding and border grow inward |

`content-box` is why your three "33% wide" columns don't fit on one row the moment you add padding. One rule fixes it forever, and it's the first thing in [`reset.css`](../client/css/base/reset.css):

```css
*, *::before, *::after { box-sizing: border-box; }
```

### Margin collapse — the other surprise

Two **vertical** margins that touch merge into one, and the bigger one wins:

```
A: margin-bottom: 30px
B: margin-top: 20px
         ↓
Gap between them = 30px, not 50px
```

Horizontal margins never collapse. Nor do margins inside a flex or grid container — which is a quiet argument for using `gap` instead and skipping the problem entirely.

### Centring

```css
.centre-me {
  max-width: 60rem;
  margin-inline: auto;   /* split the leftover space evenly */
}
```

Needs a width to work. `margin: 0 auto` on a full-width block does nothing, because there's no leftover space to split.

---

## Part 2 — Flexbox

### The one idea

A flex container has **two axes**, and every flex property targets one of them.

```
flex-direction: row            flex-direction: column
(the default)

  MAIN AXIS  ──────────▶         CROSS AXIS ──────────▶
  ┌────┬────┬────┐               ┌───────────────┐    │
  │ 1  │ 2  │ 3  │               │       1       │    │
  └────┴────┴────┘               ├───────────────┤    │ MAIN
       │                         │       2       │    │ AXIS
       ▼ CROSS AXIS              ├───────────────┤    │
                                 │       3       │    ▼
                                 └───────────────┘

  justify-content → MAIN          justify-content → MAIN (now vertical)
  align-items     → CROSS         align-items     → CROSS (now horizontal)
```

**`justify-content` always follows `flex-direction`. `align-items` is always perpendicular to it.** Change the direction and both properties swap which way they point. Almost every "why won't this centre?" bug is this.

### Container properties — set on the parent

| Property | Values | Does |
|---|---|---|
| `display` | `flex` · `inline-flex` | Makes the children flex items |
| `flex-direction` | `row` · `column` · `row-reverse` | Picks the main axis |
| `justify-content` | `flex-start` · `center` · `space-between` · `space-around` · `space-evenly` | Position along **main** |
| `align-items` | `stretch` · `center` · `flex-start` · `flex-end` · `baseline` | Position along **cross** |
| `flex-wrap` | `nowrap` · `wrap` | Allow a second line |
| `gap` | any length | Space between items only |

### Item properties — set on the children

| Property | Does |
|---|---|
| `flex-grow` | Share of the *leftover* space. `0` = don't grow |
| `flex-shrink` | How willingly it gives space back. `0` = never shrink |
| `flex-basis` | The starting size, before grow/shrink negotiate |
| `flex` | Shorthand for all three |
| `align-self` | Override `align-items` for this one item |
| `order` | Visual reorder. **Careful:** it does not change tab order, so keyboard users get a mismatch |

### The shorthands worth memorising

| Shorthand | Expands to | Use for |
|---|---|---|
| `flex: 1` | `1 1 0%` | Equal columns, ignoring content width |
| `flex: auto` | `1 1 auto` | Grow, but respect content width |
| `flex: none` | `0 0 auto` | Fixed — icons, avatars, buttons |
| `flex: 1 1 17rem` | as written | **Cards that wrap on their own** |

That last one is the card row on the bio page. Three fit on a laptop, two on a tablet, one on a phone — with no media query at all, because `flex-wrap` handles it.

### The four patterns that cover most layouts

```css
/* 1. Navbar — brand left, links right */
.navbar { display: flex; justify-content: space-between; align-items: center; }

/* 2. Dead-centre, both axes */
.hero { display: flex; justify-content: center; align-items: center; min-height: 100vh; }

/* 3. Cards that wrap by themselves */
.row  { display: flex; flex-wrap: wrap; gap: 1.5rem; }
.card { flex: 1 1 17rem; }

/* 4. Footer pinned to the bottom of a card */
.card        { display: flex; flex-direction: column; }
.card__link  { margin-top: auto; }
```

---

## Part 3 — Mistakes you will make at least once

| Symptom | Cause | Fix |
|---|---|---|
| Boxes wider than you asked for | `content-box` | `box-sizing: border-box` |
| `width` ignored on a `<span>` | Inline elements ignore it | `display: inline-block` |
| Gap smaller than expected | Margins collapsed | Use `gap`, or margin on one side only |
| `align-items: center` doesn't centre | You're on the wrong axis | Check `flex-direction` |
| Cards are different heights | `align-items` isn't `stretch` | Remove the override |
| Flex item squashed below its content | `flex-shrink` defaults to `1` | `flex-shrink: 0` |
| `position: sticky` does nothing | No `top` value given | Add `top: 0` |
| `position: absolute` flies to the page corner | No positioned ancestor | `position: relative` on the parent |
| Focus outline missing | Someone wrote `outline: none` | Replace it via `:focus-visible` |

---

## Part 4 — Can you do these without looking?

1. Centre a box horizontally **and** vertically inside its parent.
2. Navbar: logo hard left, links hard right, all vertically aligned.
3. Three cards, equal height, wrapping to one column on a phone, no media query.
4. Why is `width: 300px; padding: 20px` 340px wide by default?
5. Pin a "Read more" link to the bottom of every card in a row.
6. Which axis does `justify-content` work on when `flex-direction: column`?
7. What's the difference between `gap: 1rem` and `margin: 0.5rem` on each child?

Answers are in [`layout.css`](../client/css/layout/layout.css) and [`card.css`](../client/css/components/card.css) — but try first.

---

## Week 2 preview

| Day | Topic |
|---|---|
| Mon | CSS Grid — photo gallery |
| Tue | Media queries, mobile-first |
| Wed | Transitions, hover effects, CSS variables |
| Thu | Git: init, add, commit, branch, merge |
| Fri | GitHub: push, pull, PRs, GitHub Pages |
| Sat | Responsive landing page, live on GitHub Pages |

Flexbox is for **one dimension** — a row *or* a column. Grid is for **two at once**. They're partners, not competitors: a Grid page layout full of Flexbox components is the normal arrangement.
