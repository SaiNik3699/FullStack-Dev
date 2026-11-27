# Day 5 — display, position, Flexbox

**Week 1 · Friday**

| | |
|---|---|
| **Learn** | `display`, `position`, Flexbox |
| **Build** | A navbar and a card row |
| **Code** | `day5/index.html` and `day5/style.css` |
| **The win** | A layout that adapts, with **no media query at all** |

> Thursday was about what a box *looks* like. Friday is about where it *goes*. Three properties do almost all of it.

---

## 1 · display — what kind of box is this?

| Value | Behaviour |
|---|---|
| `block` | Full width of its parent, stacks vertically. `div`, `p`, `section`, `h1` |
| `inline` | Sits in the text flow. **Ignores `width` and `height`.** `span`, `a`, `strong` |
| `inline-block` | Sits in the flow **but accepts** `width` and `height` |
| `flex` | Children become flex items, laid out along an axis |
| `none` | Removed from the page entirely — not just invisible |

### The one that catches people

```css
span { width: 14rem; }      /* does nothing — span is inline */
span { display: inline-block; width: 14rem; }   /* now it works */
```

An inline box is sized by its content, full stop. Your Day 5 page proves it: two spans, both told `width: 14rem`, measure **182px** and **224px**.

> `display: none` removes the element from the layout *and* from screen readers. To hide something visually but keep it for assistive tech, use a visually-hidden class instead.

---

## 2 · Normal flow — what happens before you do anything

Before any Flexbox, the browser already lays out:

- **block** boxes stacked top to bottom, each full width
- **inline** boxes flowing left to right, wrapping like words in a sentence

Most of Thursday's page was normal flow. You only reach for Flexbox when you need things **side by side** with control over the spacing.

---

## 3 · position — where does the box sit?

| Value | Behaviour |
|---|---|
| `static` | The default. Follows normal flow. `top` / `left` **do nothing** |
| `relative` | Stays in the flow, then shifts. **Creates a reference for absolute children** |
| `absolute` | Leaves the flow. Positioned against the nearest **non-static** ancestor |
| `fixed` | Leaves the flow. Positioned against the viewport; stays put when scrolling |
| `sticky` | Normal until it hits a threshold, then pins |

### The relative/absolute pair

This is the pattern you will use most — the badge on your card:

```css
.card        { position: relative; }   /* the anchor */
.card__badge { position: absolute; top: 1rem; right: 1rem; }
```

**Remove the `relative` and the badge flies to the corner of the page.** With nothing positioned in between, the browser keeps walking up until it reaches the document.

### sticky needs a threshold

```css
.nav { position: sticky; top: 0; }    /* without `top`, nothing happens */
```

A sticky element with no `top`/`bottom`/`left`/`right` **silently does nothing**. That is the most common sticky bug.

---

## 4 · Flexbox — the one idea

A flex container has **two axes**, and every property targets one of them.

```
  flex-direction: row  (default)        flex-direction: column

   MAIN AXIS  ------------->             CROSS AXIS ------->   |
   +------+------+------+                +-----------------+   |
   |  1   |  2   |  3   |                |        1        |   | MAIN
   +------+------+------+                +-----------------+   | AXIS
          |                              |        2        |   |
          v  CROSS AXIS                  +-----------------+   v

   justify-content -> MAIN               justify-content -> MAIN (vertical now)
   align-items     -> CROSS              align-items     -> CROSS (horizontal)
```

> **`justify-content` always follows `flex-direction`. `align-items` is always perpendicular to it.**

Change the direction and the two swap which way they point. Almost every *"why won't this centre?"* bug is this, and nothing else.

---

## 5 · Container properties — set on the parent

| Property | Values |
|---|---|
| `display` | `flex` · `inline-flex` |
| `flex-direction` | `row` · `column` · `row-reverse` · `column-reverse` |
| `justify-content` | `flex-start` · `center` · `space-between` · `space-around` · `space-evenly` |
| `align-items` | `stretch` *(default)* · `center` · `flex-start` · `flex-end` · `baseline` |
| `flex-wrap` | `nowrap` *(default)* · `wrap` |
| `gap` | any length — space **between** items only |

`align-items: stretch` being the default is why your three cards came out exactly the same height without you asking.

---

## 6 · Item properties — set on the children

```css
flex: <grow> <shrink> <basis>;
```

| Part | Means |
|---|---|
| `grow` | Share of the **leftover** space. `0` = never grow |
| `shrink` | How willingly it gives space back. `0` = never shrink |
| `basis` | The size to start negotiating from |

| Shorthand | Expands to | Use for |
|---|---|---|
| `flex: 1` | `1 1 0%` | Equal columns, ignoring content width |
| `flex: auto` | `1 1 auto` | Grow, but respect content width |
| `flex: none` | `0 0 auto` | Fixed — icons, avatars |
| `flex: 1 1 16rem` | as written | **Cards that wrap on their own** |

That last one is the card row: *"aim for 16rem each, stretch to fill, and wrap when you can't."*

Also useful: `align-self` overrides `align-items` for one item, and `order` reorders visually — but **`order` does not change tab order**, so keyboard users get a mismatch. Use it sparingly.

---

## 7 · The four patterns that cover most layouts

```css
/* 1. Navbar — brand left, links right, vertically centred */
.nav { display: flex; justify-content: space-between; align-items: center; }

/* 2. Dead centre, both axes */
.hero { display: flex; justify-content: center; align-items: center; }

/* 3. Cards that wrap by themselves — no media query */
.cards { display: flex; flex-wrap: wrap; gap: 1.5rem; }
.card  { flex: 1 1 16rem; }

/* 4. Pin something to the bottom of a card */
.card       { display: flex; flex-direction: column; }
.card__link { margin-top: auto; }
```

**Pattern 4 is the clever one.** `margin-top: auto` in a flex column absorbs every spare pixel above the element, pushing it to the bottom. It is the same trick as `margin-inline: auto` for centring, applied to one axis. It is what keeps a row of cards aligned when their text is different lengths.

---

## 8 · gap vs margin

```css
.cards { gap: 1.5rem; }                  /* space BETWEEN items only */
.card  { margin: 0.75rem; }              /* space on the OUTSIDE too */
```

`gap` never adds space at the outer edges, and **never collapses**. Margins do both. Since `gap` works in Flexbox and Grid, it has largely replaced the old `.item + .item { margin-left: … }` trick.

---

## 9 · Responsive without media queries

Your card row goes **3 → 2 → 1** as the window narrows, and there is not one `@media` rule in the file.

```css
.cards { display: flex; flex-wrap: wrap; gap: 1.5rem; }
.card  { flex: 1 1 16rem; }
```

The logic: each card wants 16rem. When three no longer fit, `flex-wrap` drops one to the next line. When two no longer fit, it drops another.

Media queries arrive in Week 2 for the cases this cannot handle — but reach for `flex-wrap` first. It is less code and it adapts to the *content*, not to a number you guessed.

---

## 10 · Mistakes you will make at least once

| Symptom | Cause | Fix |
|---|---|---|
| `width` ignored | The element is `inline` | `display: inline-block` or `block` |
| `align-items: center` doesn't centre | You are on the wrong axis | Check `flex-direction` |
| `position: sticky` does nothing | No `top` value | Add `top: 0` |
| `absolute` element flies to the page corner | No positioned ancestor | `position: relative` on the parent |
| Cards are different heights | `align-items` was overridden | Leave it at `stretch` |
| A flex item squashed below its content | `flex-shrink` defaults to `1` | `flex-shrink: 0`, or `flex: none` |
| Space appears outside the row too | Used `margin`, wanted `gap` | Use `gap` |
| Items refuse to wrap | `flex-wrap` defaults to `nowrap` | Add `flex-wrap: wrap` |
| Sticky bar hidden behind content | Stacking order | Add `z-index` |
| Tab order doesn't match what you see | `order` was used | Fix the source order instead |

---

## 11 · Check yourself

1. Name the five values of `display` you met today.
2. Why does `width` do nothing on a `<span>`?
3. Which `position` values remove an element from the flow?
4. What does `absolute` anchor to?
5. What is missing when `position: sticky` does nothing?
6. Which axis does `justify-content` work on in a `column` container?
7. What does `flex: 1 1 16rem` mean, part by part?
8. Why do flex items end up the same height by default?
9. How does `margin-top: auto` pin a link to the bottom of a card?
10. Why is `gap` usually better than `margin` between items?

---

## 12 · Today's deliverable

- [ ] A navbar: brand hard left, links hard right, vertically centred
- [ ] The navbar sticks to the top when you scroll
- [ ] A row of at least three cards, all the same height
- [ ] The row wraps 3 → 2 → 1 as the window narrows
- [ ] **No media query anywhere**
- [ ] One element positioned `absolute` inside a `relative` parent
- [ ] A link pinned to the bottom of every card with `margin-top: auto`

**Then do this:** open DevTools, find your `.cards` element, and click the little **`flex`** chip next to it in the Elements panel. The browser draws the axes and the gaps straight onto the page. Then set `flex-direction: column` and watch `justify-content` and `align-items` swap places.

---

**Tomorrow — Day 6:** build day. No new concepts — assemble everything from Monday to Friday into one finished, styled page you would actually show someone.
