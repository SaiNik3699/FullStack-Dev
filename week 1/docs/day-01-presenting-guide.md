# Day 1 — Presenting guide

**Deck:** [`day-1-how-the-web-works.pptx`](../presentation/day-1-how-the-web-works.pptx) · 10 slides · **~21 minutes**

Each slide below gives you one message, a line to open with, what to point at, and the sentence that carries you into the next slide. The *Say* lines are starting points — put them in your own words, don't read them.

---

## Before you start

- [ ] Open the deck in **PowerPoint** (not Keynote — fonts differ):
      `open -a "Microsoft PowerPoint" "…/day-1-how-the-web-works.pptx"`
- [ ] Turn on **Presenter View** — `⌥⌘P`. Every slide has speaker notes.
- [ ] Open a **browser with DevTools ready** on a second window — you'll need it on slides 4 and 6.
- [ ] Have a **Terminal** open for the `nslookup` demo on slide 3.
- [ ] Put a **blank sheet of paper** next to you. You'll ask the room to draw on slide 6.

**Your through-line:** *everything on the web is one of two roles asking the other for something, in a format both agreed on.* If you only land one thing, land that.

---

## Timing at a glance

| Slide | Topic | Time | Running |
|---|---|---|---|
| 1 | Title | 1:00 | 1:00 |
| 2 | Client and server | 2:30 | 3:30 |
| 3 | DNS | 2:00 | 5:30 |
| 4 | HTTP | 2:30 | 8:00 |
| 5 | Methods and status codes | 2:30 | 10:30 |
| **6** | **The request diagram** | **4:00** | **14:30** |
| 7 | Frontend / backend / MERN | 2:00 | 16:30 |
| 8 | VS Code | 2:00 | 18:30 |
| 9 | Vocabulary | 1:00 | 19:30 |
| 10 | Close | 1:30 | 21:00 |

Slide 6 gets the most time on purpose — it's the deliverable.

---

## Slide 1 — How the Web Works

**1 minute · set the frame**

> **Message:** Today is the foundation everything else rests on.

**Say:**
> "This is Day 1 of a twelve-week plan. It's the only day where we write no code at all — today is entirely about understanding what actually happens when you type a web address and press Enter. By the end you'll have a diagram you drew yourself, and that diagram explains every single thing we build for the next eleven weeks."

**Point at:** the strap line — *client and server · DNS · HTTP · frontend vs backend · VS Code*. That's the map for the next twenty minutes.

**Then:** → "Let's start with the two roles."

---

## Slide 2 — Who asks, and who answers

**2:30 · the foundation**

> **Message:** Two roles, and only one of them can be trusted.

**Say:**
> "Almost everything on the web is one of these two things. The client asks. The server answers. That's it."

**Point at:** walk down the two cards **in parallel**, row by row — Job, Runs, Holds, You control. Don't do the left card then the right card; the comparison is the point.

**Pause on the last row.** *You control: nothing at all / everything.*

**Ask the room:**
> "Say I'm building a shop, and I check the price in JavaScript in the browser. What stops someone opening DevTools and changing it to one dollar?"

Let the silence sit. The answer is **nothing**.

**Point at:** the dark banner — *the client is never trustworthy.*

> "This is the one sentence to take from today. Any rule that actually matters gets enforced on the server. Week 11 has an entire day on this."

**Then:** → "So the client asks the server. But how does it even find the server?"

---

## Slide 3 — DNS: the internet's phone book

**2:00 · one simple idea**

> **Message:** DNS turns a name into a number, and caches aggressively.

**Say:**
> "Computers route by number. People remember names. DNS is the translation layer — and it's basically a chain of 'do you know?' questions."

**Point at:** run down the six numbered seeds quickly — cache, OS, router, root, .com, nameserver. Don't labour it.

**Land on step 6:** *93.184.216.34 — the answer.*

**Live demo (optional, 20 seconds):** switch to Terminal:
```bash
nslookup example.com
```
> "That's DNS. Right now, live."

**Point at:** the dark box.
> "Every level caches. That's why this takes milliseconds and is skipped entirely on reload — and it's also why, when you change a domain's settings, it can take hours to reach everyone."

**Then:** → "Now we've found the machine. What do we actually say to it?"

---

## Slide 4 — HTTP is just agreed-upon text

**2:30 · demystify**

> **Message:** HTTP isn't magic — it's plain text in an agreed shape.

**Say:**
> "People treat HTTP like something mysterious. It isn't. It's text. This is literally what travels over the wire."

**Point at:** the request block, then the response block. **Read the first line of each out loud** — `GET /api/profile HTTP/1.1` and `HTTP/1.1 200 OK`.

**Live demo (40 seconds — the strongest moment on this slide):** open DevTools → Network tab → reload any page → click the top row → Headers.
> "Same shape. Start line, headers, body. On every request on the internet."

**Point at:** the three cards along the bottom as you name them: start line, headers, body.

**Then:** → "Two parts of that text do the heavy lifting — the verb at the top of the request, and the number at the top of the response."

---

## Slide 5 — Methods and status codes

**2:30 · reference, kept light**

> **Message:** Learn the ranges and the one distinction, not the list.

**Say:**
> "Five verbs cover almost everything you'll ever do."

**Point at:** the left column. Note that **GET is the only one marked SAFE**.
> "GET should never change anything. Crawlers follow every link they find — so if you build a link that deletes a record, something will eventually click it for you."

**Point at:** the four range cards on the right.
> "Don't memorise codes. Memorise this: **4xx means I got it wrong. 5xx means the server got it wrong.** That one split will save you hours of debugging."

**Point at:** the dark strip at the bottom.
> "And the one everybody confuses: 401 is 'who are you?' — you're not logged in. 403 is 'I know exactly who you are, and no.' — you're logged in and still not allowed."

**Then:** → "Right. We've got all the pieces. Let's put them in order — and this is the slide you'll be drawing."

---

## Slide 6 — A web request, end to end ⭐

**4:00 · the deliverable — slow down here**

> **Message:** Nine steps, and you can redraw them from memory.

**Say first — set the task before you explain:**
> "Grab a pen. You're going to redraw this one from memory later today, so watch how it's built, not just what it says."

**Walk the arrows top to bottom.** Say the number out loud each time. Don't rush — this is the slide they're paying attention for.

| # | Say roughly |
|---|---|
| 1 | "You type the URL and hit Enter. Nothing has left your machine yet." |
| 2 | "Browser asks DNS: which IP is this name?" |
| 3 | "DNS answers with the number." |
| 4 | "Now we open a connection — TCP, then the TLS handshake. That handshake *is* the 's' in https." |
| 5 | "Now, finally, the actual request. `GET slash`." |
| 6 | "Server does its work — matches a route, reads data, builds a reply." |
| 7 | "200 OK, and the HTML comes back." |
| 8 | "Browser reads the HTML, finds every CSS, JS and image tag — and fires a brand-new request for each one." |
| 9 | "Then it paints. DOM, CSSOM, render tree, pixels." |

**Then call out the three things worth noticing** — this is what turns a list into understanding:

1. **Point at where the DNS lifeline stops** (just after step 3).
   > "Notice DNS drops out. It's done. Steps 4 to 8 are a clean two-party conversation."

2. **Point at steps 5, 6, 7 together.**
   > "This trio is the whole job. Every API call you write for the next eleven weeks is this pair — request out, response back."

3. **Point at step 8.**
   > "This is why one page is never one request. Open the Network tab on any site and count the rows — it's usually dozens."

**Optional demo (30 seconds):** DevTools → Network → reload → point at the row count.

**Then:** → "So that's the journey. Now — who writes which part of it?"

---

## Slide 7 — Frontend, backend, and where MERN sits

**2:00 · orientation**

> **Message:** MERN is mostly a backend stack, and the two halves only ever touch through HTTP.

**Say:**
> "Everything we just traced gets built by two teams — or in your case, by you wearing two hats."

**Point at:** the two cards. Frontend runs on a machine you don't control; backend runs on hardware you rent. (Callback to slide 2.)

**Point at:** the lettered seeds — **R** on the left, **N**, **E**, **M** on the right.

**Ask the room:**
> "How many of MERN's four letters run in the browser?"

Most people guess two or three. The answer is **one**.

> "React is the only one. MERN is mostly a backend stack — that surprises nearly everyone."

**Point at:** the dark banner.
> "And the two sides share nothing but HTTP. No shared memory, no shared variables. That constraint is exactly what lets you swap React for something else without touching the server."

**Then:** → "Last thing before you go — let's make sure your tools are ready."

---

## Slide 8 — Set up VS Code

**2:00 · practical, keep it brisk**

> **Message:** Ten minutes of setup now saves hours later.

**Say:**
> "Download it from code.visualstudio.com, then spend ten minutes on exactly this list."

**Point at:** the five extensions. Name them, one line each, don't elaborate.
> "**Live Server** is the one you'll use today — right-click any HTML file and it opens in a browser that reloads as you save."

**Point at:** the shortcuts card.
> "Learn `Cmd + P` and `Cmd + Shift + P` today. Those two alone change how fast you move."

**Point at:** the dark settings strip.
> "And change those three settings before you write a line of code."

**If you have time:** do the Live Server install live. Everyone should leave with it working.

**Then:** → "Quick recap of the vocabulary, and then what you owe me."

---

## Slide 9 — The words you now own

**1:00 · fast recap — do not linger**

> **Message:** You can now define all of these.

**Say:**
> "Twenty minutes ago some of these were noise. Let's check."

**Technique:** read the **term only** and let the room supply the definition. Do about four or five — `Port`, `Status code`, `Localhost`, `Latency` work well — then move on.

> "If any of those felt shaky, the slide it came from is in the deck and in the notes."

**Then:** → "Last slide. Here's what you're taking away."

---

## Slide 10 — Before you close the laptop

**1:30 · assign and close**

> **Message:** Three deliverables, and the diagram is the real one.

**Point at:** the three numbered items on the left.
> "Notes in your own words. The nine-step diagram. VS Code working."

**Emphasise item 2:**
> "Hand-drawn. Not traced, not screenshotted. The point is whether you can produce it from memory — because if you can, you understand the web, and if you can't, you've only read about it."

**Point at:** the five questions on the right.
> "Answer these out loud tonight. Out loud, not in your head — you find the gaps much faster."

**Close:**
> "Tomorrow is Day 2 — HTML. Structure, headings, links, images, lists, tables. And you'll build a bio page with no CSS at all, so you can see exactly what the browser gives you for free."

---

## Questions you should expect

| Question | Short answer |
|---|---|
| *"Why do we need DNS? Why not just use IPs?"* | Nobody remembers `93.184.216.34`. And the IP can change without the name changing — that's how sites move servers invisibly. |
| *"What's the difference between HTTP and HTTPS?"* | Same protocol, wrapped in TLS. That's step 4 on the diagram. Without it, anyone on the network reads your traffic in plain text. |
| *"Is the frontend/backend split always this clean?"* | No — Next.js blurs it by running React on the server. That's Week 11. Learn the clean split first. |
| *"Why not validate on the client? It's faster."* | Do both. Client-side for speed and friendliness; server-side because it's the only one that can't be bypassed. |
| *"What's the difference between 401 and 403 again?"* | 401 = not logged in. 403 = logged in, still not allowed. |
| *"Do I have to use VS Code?"* | No, but the extensions list assumes it, and so will everything that follows. |
| *"What's a port, really?"* | A machine runs many programs. The port says which one. `:3000` is our Express server; web traffic defaults to `:80` and `:443`. |

---

## If you're running out of time

Cut in this order — each one is safe to drop:

1. **Slide 9** (vocabulary) — it's in the notes. Saves 1 min.
2. **Slide 8** (VS Code) — say "the setup list is in the deck, do it tonight." Saves 2 min.
3. **Slide 5's left column** — status codes matter more than methods on day one. Saves 1 min.
4. The **live demos** on slides 3 and 4. Saves 1 min.

**Never cut slide 6.** If you're badly over, skip straight to it from slide 4 — the diagram is the deliverable and the whole point of the session.

## If you're running short on material

- Slide 4: walk through a **real** request in DevTools, header by header.
- Slide 6: have the room draw it *during* the session and compare.
- Slide 7: sketch where a login request would travel across the diagram from slide 6.

---

## Delivery notes

- **Slow down on slide 6 and speed up on slides 8 and 9.** The instinct is the opposite — resist it.
- **Say the numbers out loud** when walking the diagram ("one… two… three"). It makes the sequence stick.
- **Use the three questions to the room** (slides 2, 7, and 9). A talk with three genuine pauses lands far better than twenty-one minutes of narration.
- **Point at the screen, don't read it.** Every slide is designed so you can gesture at a region and talk — the text is for the audience's recall, not your script.
- **If you blank:** Presenter View has the notes for every slide. `⌥⌘P`.
