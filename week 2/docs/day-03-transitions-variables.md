# Week 2, Day 3 — Transitions, hover effects, CSS variables

**Week 2 · Wednesday**

| | |
|---|---|
| **Learn** | Transitions, hover effects, CSS variables |
| **Build** | Polished buttons and cards |
| **Code** | `week 2/day3/index.html` and `style.css` |

> The three topics are one idea: **variables hold the values, hover changes them, and a transition makes the change take time instead of happening instantly.**

---

## 1 · Custom properties

```css
:root {
  --accent: #0d7d74;
}

.btn { background: var(--accent); }
.btn { background: var(--accent, #0d7d74); }   /* with a fallback */
```

`:root` is the `<html>` element. Declaring there makes a property readable everywhere.

The name **must** start with two dashes, and it is **case-sensitive** — `--Accent` and `--accent` are different properties.

### What a variable can hold

Any value, including a fragment of one:

```css
--pad: .7rem 1.4rem;          /* a whole shorthand value */
--shadow-colour: 22 33 46;    /* just the numbers        */

padding: var(--pad);
box-shadow: 0 4px 12px rgb(var(--shadow-colour) / .2);
```

That second trick — storing channel numbers rather than a colour — lets you vary the alpha without redefining the colour.

---

## 2 · Why these are not Sass variables

This is the part that matters, and the reason Wednesday exists.

| | Sass `$variable` | CSS `--variable` |
|---|---|---|
| Exists | At **build** time | At **run** time, in the browser |
| After build | Substituted and gone | Still there, inspectable in DevTools |
| Inherits | No | **Yes — down the whole tree** |
| Changeable live | No | Yes, by a class, a media query, or JavaScript |

Because they inherit, **overriding one on a parent re-themes everything inside it**:

```css
.scope--warm { --accent: #b45309; }
```

Nothing else changes. In your Day 3 page the identical `.btn` computes to `rgb(13,125,116)` in one box and `rgb(180,83,9)` in the next, purely because of that one line on an ancestor. A preprocessor cannot do this at all.

### The pattern worth stealing

Define the component once in terms of variables. Let variants override only the variables.

```css
.btn         { background: var(--accent); padding: var(--btn-pad); }
.btn--danger { --accent: #b4341f; }
.btn--lg     { --btn-pad: .95rem 1.9rem; }
```

One rule, five variants, and the rule never changes. That is a design system in miniature.

---

## 3 · Transitions — the four parts

```css
transition: background-color 140ms cubic-bezier(.2,.7,.3,1) 0ms;
         /*  property        duration  timing-function      delay */
```

| Part | Does |
|---|---|
| `transition-property` | **Which** properties animate |
| `transition-duration` | How long. Under ~100ms reads as instant; over ~500ms feels slow |
| `transition-timing-function` | The curve of the change |
| `transition-delay` | Wait before starting |

A transition needs **two states**: the normal rule and something that changes it — `:hover`, `:focus`, a class toggled by JavaScript. Put the `transition` on the **base** rule, not inside `:hover`, or it only animates on the way in and snaps back on the way out.

### Name the properties. Never `transition: all`

```css
transition: all 140ms ease;                       /* lazy, and costly */
transition: background-color 140ms, transform 140ms;   /* deliberate   */
```

`all` animates things you never intended — including properties the browser adds later — and makes it harder to reason about. Your Day 3 buttons list exactly three.

---

## 4 · What can and cannot be transitioned

A property can animate if the browser can compute an **in-between** value.

| Animatable | Not animatable |
|---|---|
| colours, lengths, `opacity` | `display` |
| `transform`, `box-shadow` | `position` |
| `border-radius`, `background-color` | `font-family` |

`display: none` → `block` is the classic disappointment: there is no halfway, so it snaps. Fade something with `opacity` and `visibility` instead.

A plain custom property cannot be transitioned either, because the browser does not know its type — unless you declare it with `@property`, which tells it.

---

## 5 · Timing functions

| Function | Feels like |
|---|---|
| `linear` | Mechanical. Right for spinners, wrong for UI |
| `ease` | The default. Slow, fast, slow |
| `ease-in` | Starts slow. Good for things **leaving** |
| `ease-out` | Ends slow. Good for things **arriving** — the usual choice |
| `cubic-bezier(…)` | Anything you like |
| `steps(n)` | Jumps in n stages. Sprite animation, typewriter effects |

**A y value above 1 overshoots and settles back** — a spring, with no JavaScript:

```css
transition-timing-function: cubic-bezier(.34, 1.56, .64, 1);
```

Your page has all five side by side, same distance and duration, so the difference is visible rather than theoretical.

---

## 6 · Animate the cheap things

The browser renders in stages: **layout → paint → composite.** Which stage a property touches decides what it costs.

| Property | Triggers | Cost |
|---|---|---|
| `transform`, `opacity` | Composite only | **Cheap** — can go to the GPU |
| `background-color`, `box-shadow` | Paint | Moderate |
| `width`, `height`, `top`, `margin` | **Layout** | Expensive — reflows the page every frame |

> To move something, use `transform: translate()`, not `top` or `margin`.

A card lift is `transform` plus `box-shadow`. Moving it with `top` would look identical and cost far more.

---

## 7 · Hover, and its three siblings

| Selector | Fires when |
|---|---|
| `:hover` | The pointer is over it |
| `:focus-visible` | It is focused **via keyboard** |
| `:active` | It is being pressed |
| `:focus-within` | **Anything inside it** has focus |

**Style `:focus-visible` every time you style `:hover`.** A keyboard user has no pointer, so a hover-only affordance is invisible to them. `:focus-visible` is the modern choice because it skips the ring on mouse clicks.

`:active` returning the element to its resting position makes a button feel physically pressed:

```css
.btn:hover  { transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
```

### Never put information only in hover

A tooltip that only appears on hover does not exist on a phone, and does not exist for a keyboard user. Hover is for **polish**, not for content.

---

## 8 · Hover on a touch screen

A finger cannot hover. Tap a card with a `:hover` rule and the state **sticks** until you tap elsewhere.

```css
@media (hover: none) {
  .card:hover { transform: none; box-shadow: none; }
}
```

Or invert it and only apply hover where hover exists:

```css
@media (hover: hover) {
  .card:hover { transform: translateY(-4px); }
}
```

Either is fine. Choosing neither is the bug.

---

## 9 · Motion is a preference

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
}
```

For some people motion causes nausea or migraine, and the operating system already has the setting. Honouring it is three lines. `.01ms` rather than `0` keeps any `transitionend` handlers firing.

---

## 10 · color-mix — deriving colours instead of listing them

```css
--accent: #0d7d74;
--accent-dk:   color-mix(in srgb, var(--accent) 75%, black);
--accent-wash: color-mix(in srgb, var(--accent) 12%, white);
```

Now a variant only sets `--accent` and the darker and lighter versions follow. Without it you would list three hex codes per variant and keep them in step by hand.

It is well supported in current browsers, but check before relying on it for something critical:

```css
@supports (color: color-mix(in srgb, red 50%, blue)) { }
```

---

## 11 · Mistakes you will make at least once

| Symptom | Cause | Fix |
|---|---|---|
| Animates in, snaps back out | `transition` is inside `:hover` | Put it on the base rule |
| `display: none` will not fade | Not animatable | Use `opacity` + `visibility` |
| Everything feels sluggish | Duration too long | 120–200ms for UI feedback |
| Janky animation | Animating `width`/`top` | Use `transform` |
| Hover state stuck on a phone | No `(hover: none)` guard | Add one |
| Keyboard users see no feedback | Only `:hover` styled | Add `:focus-visible` |
| `var()` does nothing | Typo, or wrong case | They are case-sensitive |
| Variable "not inherited" | Declared on a sibling, not an ancestor | They inherit **down** only |
| Custom property will not transition | The browser does not know its type | Declare it with `@property` |

---

## 12 · Check yourself

1. Where does `:root` point, and why declare variables there?
2. Name two things a CSS variable does that a Sass variable cannot.
3. What are the four parts of the `transition` shorthand?
4. Why does `transition` belong on the base rule rather than `:hover`?
5. Why avoid `transition: all`?
6. Why will `display` not transition?
7. Which two properties are cheapest to animate, and why?
8. When would you pick `ease-out` over `ease-in`?
9. What does a cubic-bezier y value above 1 do?
10. What goes wrong on a touch screen without a `(hover: none)` guard?

---

## 13 · Today's deliverable

- [ ] Buttons and cards at `week 2/day3/`
- [ ] One base rule per component; variants override **only variables**
- [ ] At least three variants produced without touching the base rule
- [ ] Transitions that name their properties — no `transition: all`
- [ ] `:hover`, `:active` **and** `:focus-visible` all styled
- [ ] The lift uses `transform`, not `top`
- [ ] A `prefers-reduced-motion` block
- [ ] A `(hover: none)` guard

**Then do this:** open DevTools, select `:root`, and edit `--accent` live in the Styles panel. Every button, card border, chip and focus ring changes together. Then try the same with a Sass build and watch nothing happen — that is the difference in one experiment.

> **A note on measuring your own transitions:** if you read a computed style immediately after hovering, you will get the *start* frame, not the end. Wait longer than the duration before you measure, or you will think a working transition is broken.

---

**Tomorrow — Day 4:** Git. `init`, `add`, `commit`, `branch`, `merge` — and every file you have written in two weeks finally gets a history.
