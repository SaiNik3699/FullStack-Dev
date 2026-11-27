# Week 2, Day 1 — CSS Grid

**Week 2 · Monday**

| | |
|---|---|
| **Learn** | CSS Grid |
| **Build** | A photo gallery grid |
| **Code** | `week 2/day1/index.html` and `style.css` |
| **Not today** | Media queries — that is Tuesday |

> Last week ended with Flexbox. Grid is its partner, not its replacement. The difference is one word: **dimensions.**

---

## 1 · Grid vs Flexbox

| | Flexbox | Grid |
|---|---|---|
| Dimensions | **One** — a row *or* a column | **Two** — rows *and* columns together |
| You define | How each **item** behaves | The **tracks** on the parent |
| Content flows | Items decide, container reacts | Container decides, items land in it |
| Reach for it | A navbar, a button row, a card row | A page layout, a gallery, a dashboard |

**The practical test:** if you only care about one direction, use Flexbox. If you need things to line up **across rows *and* down columns** at the same time, use Grid.

They nest happily. A Grid page layout full of Flexbox components is the normal arrangement.

---

## 2 · The vocabulary

```
            column line 1   2        3        4
                    |       |        |        |
     row line 1 --- +-------+--------+--------+
                    | cell  |  cell  |  cell  |   <- row TRACK
     row line 2 --- +-------+--------+--------+
                    | cell  |  cell  |  cell  |
     row line 3 --- +-------+--------+--------+
                       ^
                  column TRACK            the space between = GAP
```

| Word | Means |
|---|---|
| **Track** | One row or one column |
| **Line** | The dividing line between tracks. Numbered from 1 |
| **Cell** | One row track crossed with one column track |
| **Area** | A rectangle of one or more cells |
| **Gap** | The space between tracks — never on the outer edge |

Lines are numbered from **1**, not 0. `grid-column: 1 / 3` means "from line 1 to line 3" — which is **two** columns, not three. That off-by-one catches everyone once.

---

## 3 · Making a grid

```css
.gallery {
  display: grid;
  grid-template-columns: 200px 200px 200px;   /* three fixed tracks */
  grid-template-rows: 150px 150px;            /* two fixed rows     */
  gap: 1rem;
}
```

`gap` sets both directions. `row-gap` and `column-gap` set them separately. Unlike margins, **`gap` never collapses and never adds space at the outer edges.**

---

## 4 · fr — the unit Grid adds

`1fr` means **one share of the space left over** after fixed sizes and gaps are taken out.

```css
grid-template-columns: 1fr 2fr 1fr;
```

The middle track is always twice its neighbours, at any window width. In your gallery page that demo measures **252 / 504 / 252** — exactly double.

**Why not percentages?** Because `33% 33% 33%` plus a `1rem` gap overflows: percentages do not know the gap exists. `fr` is calculated *after* the gaps are subtracted, so it always fits.

---

## 5 · repeat(), minmax(), auto-fit

Three functions that turn a fixed grid into a responsive one.

```css
grid-template-columns: repeat(3, 1fr);        /* 1fr 1fr 1fr, written once */
grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
```

| Piece | Does |
|---|---|
| `repeat(3, 1fr)` | Shorthand for writing the same track three times |
| `minmax(14rem, 1fr)` | Each track is **at least** 14rem, otherwise an equal share |
| `auto-fit` | Make as many tracks as will fit, then **stretch** them to fill |
| `auto-fill` | Same, but **keeps** the empty tracks instead of stretching |

Together, that one line is a responsive gallery with **no media query**. Your page measures:

| Window | Columns |
|---|---|
| 1200px | 5 |
| 950px | 4 |
| 720px | 3 |
| 500px | 2 |

The layout is decided by **the content's minimum size**, not by a breakpoint you guessed. That is the real advantage.

### auto-fit vs auto-fill

With three items in a wide container:

```
auto-fit    [--- item ---][--- item ---][--- item ---]   tracks stretch
auto-fill   [item][item][item][     ][     ][     ]      empty tracks kept
```

Use `auto-fit` when you want the items to fill the row — which is almost always.

---

## 6 · Placing items

```css
.feature { grid-column: span 2; grid-row: span 2; }   /* take 2 x 2 cells  */
.tall    { grid-row: span 2; }                        /* 2 rows, 1 column  */
.exact   { grid-column: 2 / 4; grid-row: 1 / 3; }     /* by line number    */
```

`span n` says "take n tracks, starting wherever I land". Grid then flows everything else around it. Line numbers say "start here, end there" — more control, more to maintain.

In your gallery, a plain tile measures **248 × 192**; the feature tile measures **512 × 400** — exactly two tracks plus the gap, in both directions.

### grid-auto-flow: dense

By default Grid keeps source order and may leave holes. `dense` lets it backfill gaps with later items. Use carefully — it **changes the visual order** without changing tab order, so keyboard users get a mismatch.

---

## 7 · Explicit vs implicit

```css
grid-template-columns: repeat(3, 1fr);   /* EXPLICIT: you declared these */
grid-auto-rows: 12rem;                   /* IMPLICIT: rows Grid invents  */
```

If you give nine items a three-column grid and never declare rows, Grid **creates** the rows it needs. Those are implicit, and `grid-auto-rows` sizes them. Without it they size to content, and a gallery ends up ragged.

---

## 8 · Alignment

Grid aligns on both axes, and the names follow a pattern:

| Property | Aligns | Axis |
|---|---|---|
| `justify-items` | Items **inside** their cell | Inline (horizontal) |
| `align-items` | Items **inside** their cell | Block (vertical) |
| `justify-content` | The **whole grid** in the container | Inline |
| `align-content` | The **whole grid** in the container | Block |
| `place-items` | Both `align-items` and `justify-items` | Both |

```css
display: grid; place-items: center;
```

That is the shortest way to centre something both ways — two words, no Flexbox needed.

`justify-self` and `align-self` override the container's setting for one item.

---

## 9 · grid-template-areas

For a page layout, you can draw it in ASCII:

```css
.page {
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
}
header { grid-area: header; }
aside  { grid-area: sidebar; }
```

Each string is a row; each word is a column. A `.` means an empty cell. **Every row must have the same number of columns**, or the whole declaration is ignored — silently.

It is the most readable way to express a page skeleton, and the easiest to rearrange later.

---

## 10 · What Grid cannot do on its own

Your gallery reflows 5 → 4 → 3 → 2 columns with no breakpoint. But on a **375px phone** its tracks measure **224px + 87px** — one wide tile and one squashed one.

**Why:** `.tile--feature` has `grid-column: span 2`. A spanning item *forces* the grid to have two tracks, and two 14rem tracks cannot fit 375px, so the second one gets whatever is left.

**What does not fix it:** `minmax(min(14rem, 100%), 1fr)`. That idiom only collapses the floor when the **container** is narrower than 14rem; here the container is 327px, so the floor stays at 224px and nothing changes. Measured, not assumed.

**What does fix it:** stopping the feature tile spanning on a narrow screen — which needs a media query.

> `auto-fit` + `minmax()` gets you most of the way. Breakpoints cover what it cannot express. That is tomorrow.

---

## 11 · Mistakes you will make at least once

| Symptom | Cause | Fix |
|---|---|---|
| `grid-column: 1 / 3` covers 2 columns, not 3 | Lines are numbered, not tracks | Count lines, not cells |
| Tracks overflow the container | Used `%` with a `gap` | Use `fr` — it accounts for the gap |
| Rows are ragged heights | No `grid-auto-rows` | Set it, or `grid-template-rows` |
| `grid-template-areas` silently ignored | Rows have unequal column counts | Make every string the same length |
| Images squashed or stretched | No `object-fit` | `object-fit: cover` on the image |
| Empty tracks appear on the right | Used `auto-fill` | Use `auto-fit` |
| `place-items: center` does nothing | Parent is not `display: grid` | Add it |
| Gallery will not collapse to one column | Something has `span 2` | Unspan it at a breakpoint |
| Tab order does not match the layout | `dense` or line-placement reordered it | Fix the source order |

---

## 12 · Check yourself

1. In one word, what separates Grid from Flexbox?
2. What is a track? A line? A cell?
3. How many columns does `grid-column: 1 / 3` cover?
4. What does `1fr` actually mean?
5. Why does `33% 33% 33%` with a gap overflow, but `1fr 1fr 1fr` not?
6. What is the difference between `auto-fit` and `auto-fill`?
7. What does `minmax(14rem, 1fr)` guarantee?
8. What is an implicit row, and which property sizes it?
9. What is the shortest way to centre something on both axes?
10. Why did the gallery still go wrong at 375px?

---

## 13 · Today's deliverable

- [ ] A photo gallery at `week 2/day1/index.html`
- [ ] `display: grid` with `repeat(auto-fit, minmax(…, 1fr))`
- [ ] A `gap` — not margins between tiles
- [ ] `grid-auto-rows` so the rows are even
- [ ] At least one item spanning two columns, one spanning two rows
- [ ] `object-fit: cover` on every image
- [ ] Every image has real alt text
- [ ] **No media query** — Grid does the reflow today

**Then do this:** open DevTools, find your `.gallery`, and click the little **`grid`** chip beside it in the Elements panel. The browser draws every track, line number and gap straight onto the page. Resize the window and watch the track count change by itself.

---

**Tomorrow — Day 2:** media queries and mobile-first. You will make this gallery genuinely responsive, starting with the 375px case it gets wrong today.
