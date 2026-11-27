# Week 2, Day 2 — Media queries and mobile-first

**Week 2 · Tuesday**

| | |
|---|---|
| **Learn** | Media queries, mobile-first |
| **Build** | Make the gallery responsive |
| **Code** | `week 2/day2/index.html` and `style.css` |
| **Fixes** | Yesterday's 375px failure |

> Yesterday's gallery reflowed on its own but broke on a phone: its tracks measured **224px + 87px** instead of one even column. Today that is fixed properly — and the fix is the lesson.

---

## 1 · The one tag that makes any of this work

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Without it a phone pretends to be a **980px desktop** and shrinks the whole page to fit. Your media queries still fire — against 980, not 375 — so nothing behaves as you expect.

It has been in every page since Week 1 Day 2. Today is the day it starts mattering.

---

## 2 · Syntax

```css
@media (min-width: 40em) {
  .gallery { grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); }
}
```

A media query is a **condition wrapped around ordinary rules**. When the condition is true the rules apply; when it is false they do not exist. Nothing else changes — specificity, inheritance and the cascade all work exactly as before.

You can combine conditions:

```css
@media (min-width: 40em) and (max-width: 64em)   { }   /* both       */
@media (min-width: 40em), print                  { }   /* either     */
@media not all and (min-width: 40em)             { }   /* negated    */
@media (min-width: 40em) and (orientation: landscape) { }
```

Note that `,` means **or**, not "and". That trips people up.

---

## 3 · min-width vs max-width

| | `min-width: 40em` | `max-width: 40em` |
|---|---|---|
| Applies when | The screen is **at least** 40em | The screen is **at most** 40em |
| Used by | **Mobile-first** | Desktop-first |
| You are saying | "from here up, add this" | "from here down, undo that" |

They are mirror images, and mixing both in one project is how stylesheets become unreadable. **Pick one direction and stay in it.**

---

## 4 · Mobile-first — what it actually means

**The rules outside any media query are the phone layout.** Queries only ever add.

```css
/* BASE = phone. No query. */
.gallery { grid-template-columns: 1fr; }

@media (min-width: 40em) {        /* tablet adds */
  .gallery { grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); }
  .tile--tall { grid-row: span 2; }
}

@media (min-width: 64em) {        /* desktop adds */
  .tile--feature { grid-column: span 2; grid-row: span 2; }
}
```

Three reasons it wins:

1. **A phone applies the fewest rules.** The weakest device does the least work.
2. **It forces you to decide what matters.** The base layout is the content that cannot be dropped.
3. **You only ever add.** Desktop-first means writing a complex layout, then unpicking it — and you will miss a piece.

### This is what fixed yesterday

The base has **one column and nothing spanning**. That is precisely the 375px bug: a `span 2` tile forced two 14rem tracks into a 327px container. Removing the span from the base, and only granting it at 64em, fixes it at the root rather than patching it.

| Viewport | Columns | Feature tile | Tall tile |
|---|---|---|---|
| 375px | 1 | — | — |
| 800px | 3 | — | spans 2 rows |
| 1150px | 4 | spans 2 × 2 | spans 2 rows |

---

## 5 · Choosing breakpoints

### Use `em`, not `px`

```css
@media (min-width: 40em)   /* 640px at the default font size */
@media (min-width: 640px)  /* 640px, always */
```

If a reader has set a larger browser font, an `em` breakpoint **scales with them** — the layout changes when *their* text needs it to. A `px` breakpoint ignores the preference entirely.

> In a media query, `em` is always relative to the **browser's default font size**, not your `:root` setting. So 40em is 640px even if you set `html { font-size: 20px }`.

### Let the content choose, not the device

Do not look up "iPhone width" and hard-code it. Devices change; your content does not. **Widen the window until the layout looks wrong — that is your breakpoint.**

Three is usually plenty: phone, tablet, desktop. Your gallery uses two queries and gets three layouts.

---

## 6 · Reach for intrinsic layout first

`auto-fit` + `minmax()` and `flex-wrap` adapt with **no breakpoint at all**, because they respond to the content's own minimum size rather than to a number you guessed.

> **Use a media query only for what intrinsic layout cannot express.**

Yesterday proved the limit: `auto-fit` could not stop a spanning item forcing two tracks. No track-sizing function fixes that — only a breakpoint can. So the gallery uses exactly two queries, and Grid does the rest.

That is the right division of labour.

---

## 7 · Media features that are not width

| Query | Matches when |
|---|---|
| `(prefers-reduced-motion: reduce)` | The OS is set to reduce motion |
| `(prefers-color-scheme: dark)` | The OS is in dark mode |
| `(pointer: coarse)` | The primary input is a finger, not a mouse |
| `(hover: none)` | The device cannot hover — so hover-only UI is unreachable |
| `(orientation: landscape)` | Wider than tall |
| `print` | The page is being printed |

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: .01ms !important; }
}
```

**`prefers-reduced-motion` is not optional polish.** For some people motion causes nausea or migraine. Honouring it is three lines.

`print` is a medium too — hiding navigation and letting a grid go flat costs almost nothing and makes a page genuinely printable.

---

## 8 · Testing

- **DevTools device toolbar** — `Cmd + Shift + M` in Chrome. Drag the edge and watch the layout change.
- **Just resize the window.** Slower, but it shows you the in-between widths a device preset skips.
- **Check the awkward sizes**, not only 375 and 1440. Most bugs live at 600–800px.
- **Zoom to 200%.** This is why `em` breakpoints matter — the layout should reflow, not break.

A trick worth stealing from your Day 2 page: put a small element on screen whose `::after` content is set inside each media query. It then tells you which breakpoint is winning, with no JavaScript.

---

## 9 · Two gotchas this build hit

### A CSS escape eats the next space

```css
content: "\2265 40em";     /* renders "≥40em" -- the space is GONE */
```

A hex escape is terminated by whitespace, and **that whitespace is consumed** — even with six digits. Either double the space or just type the character. Writing `≥` and `×` literally is clearer anyway.

### A stylesheet with non-ASCII needs a charset

```css
@charset "utf-8";   /* must be the VERY first thing -- not even a comment before it */
```

Without it, a stylesheet's encoding falls back to the referencing document's, which is not guaranteed. The symptom is mojibake: `≥` becomes `â‰¥`.

---

## 10 · Mistakes you will make at least once

| Symptom | Cause | Fix |
|---|---|---|
| Page looks desktop-sized on a phone | No viewport meta | Add it |
| Queries fire at the wrong width | Testing with browser zoom | Use the device toolbar |
| Styles "do not apply" inside a query | Base rule is more specific | Match or raise the specificity |
| Layout breaks between breakpoints | Only tested 375 and 1440 | Drag slowly through the middle |
| `@media (max-width: 40em)` and `(min-width: 40em)` both fire | They overlap at exactly 40em | Use `39.99em`, or stay mobile-first |
| Dozens of breakpoints | Device-driven thinking | Let the content decide |
| Hover menu unusable on a phone | Hover assumed | Guard with `(hover: hover)` |
| `@charset` ignored | Something precedes it | It must be byte one |
| Text in `content` missing a space | Escape ate it | Use the literal character |

---

## 11 · Check yourself

1. What happens on a phone without the viewport meta tag?
2. What does `,` mean between two media conditions?
3. What is in the base layer of a mobile-first stylesheet?
4. Give two reasons mobile-first beats desktop-first.
5. Why `em` breakpoints rather than `px`?
6. What is `em` relative to **inside** a media query?
7. When should you *not* reach for a media query?
8. Why could no track-sizing function fix yesterday's 375px bug?
9. What does `(pointer: coarse)` tell you?
10. Where must `@charset` appear, and why?

---

## 12 · Today's deliverable

- [ ] The gallery at `week 2/day2/`, written mobile-first
- [ ] Base layer = the phone layout, with no media query
- [ ] At least two `min-width` queries, in `em`
- [ ] Nothing spans in the base layer
- [ ] One non-width query — `prefers-reduced-motion` at minimum
- [ ] A `print` block
- [ ] No horizontal scroll at 375px, 800px or 1150px
- [ ] `@charset "utf-8";` if the stylesheet contains any non-ASCII

**Then do this:** open DevTools, drag the viewport slowly from 1200px down to 320px, and watch the badge change at 64em and 40em. Then set your browser's default font size to 20px and drag again — with `em` breakpoints the layout now switches *earlier*, because the text needs the room sooner. That is the whole argument for `em` in one experiment.

---

**Tomorrow — Day 3:** transitions, hover effects and CSS variables. The gallery stops being static and starts responding to the pointer.
