# Day 1 — How the web works

**Week 1 · Monday**

| | |
|---|---|
| **Learn** | Client, server, HTTP, DNS; what frontend and backend do; install VS Code |
| **Build** | These notes + a diagram of a web request |
| **Deck** | [`day-1-how-the-web-works.pptx`](../presentation/day-1-how-the-web-works.pptx) — 10 slides |
| **Diagram** | [`web-request-diagram.svg`](web-request-diagram.svg) — and slide 6 |

> Today is the only day of the twelve weeks with no code to write. It is all mental model. Everything after this sits on top of it.

---

## 1 · Client and server

Two roles. Almost everything on the web is one of them.

| | **Client** | **Server** |
|---|---|---|
| **Job** | Asks for things | Answers |
| **Usually** | Your browser | A computer in a data centre |
| **Runs** | HTML, CSS, JavaScript | Node.js, Python, Java, Go… |
| **Holds** | Nothing permanent | Files, databases, the rules |
| **Lives on** | The user's own machine | Hardware you rent |
| **You control** | Nothing at all | Everything |

### The one idea to take from today

> **The client is never trustworthy.**

Anyone can open DevTools and rewrite your JavaScript. So every rule that actually matters — who may delete this, what the price is, who counts as an admin — has to be enforced **on the server**.

If the price is checked in browser JavaScript, nothing stops someone editing it. This is why Week 11 has a whole day on security.

---

## 2 · DNS — the internet's phone book

Computers route by **number** (`93.184.216.34`). People remember **names** (`example.com`). DNS converts the second into the first.

```
you type example.com
 1. browser cache ......... seen it in the last few minutes?
 2. operating system ...... its own cache and hosts file
 3. your router ........... then your ISP's resolver
 4. root server ........... "try the .com servers"
 5. the .com servers ...... "try example.com's nameserver"
 6. that nameserver ....... "93.184.216.34"   ← the answer
```

**Try it yourself:**

```bash
nslookup example.com
```

**Why it feels instant:** every level caches the answer. Usually milliseconds, and skipped entirely on a reload. It is also why a DNS change can take hours to reach everyone — that is the TTL expiring.

---

## 3 · HTTP — the format of the conversation

HTTP is just agreed-upon text. Three parts to each message: a **start line**, some **headers**, and an optional **body**.

**The request** — what your browser sends:

```http
GET /api/profile HTTP/1.1
Host: localhost:3000
Accept: application/json
```

**The response** — what the server sends back:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"success":true,"data":{ ... }}
```

| Part | What it carries |
|---|---|
| **Start line** | The verb and address (request), or the verdict (response) |
| **Headers** | Metadata — who, what format, how long |
| **Body** | The actual payload — HTML, JSON, an image |

---

## 4 · Methods and status codes

### The verb — what you are asking for

| Method | Means | Changes data? |
|---|---|---|
| `GET` | Give me something | **No** — safe |
| `POST` | Here is something new | Yes |
| `PUT` | Replace this entirely | Yes |
| `PATCH` | Change part of this | Yes |
| `DELETE` | Remove this | Yes |

> `GET` is the only one that must never change anything. Crawlers follow every link they find — so a link that deletes a record is a bug waiting to happen.

### The verdict — learn the ranges, not the numbers

| Range | Meaning | Common ones |
|---|---|---|
| **2xx** | It worked | `200 OK` · `201 Created` · `204 No Content` |
| **3xx** | Look elsewhere | `301` permanent · `302` temporary |
| **4xx** | **You** got it wrong | `400` · `401` · `403` · `404` |
| **5xx** | **The server** got it wrong | `500` · `502` · `503` |

**The one that catches everybody:**

- **`401` = "who are you?"** — you are not logged in.
- **`403` = "I know exactly who you are, and no."** — logged in, still not allowed.

---

## 5 · A web request, end to end — *today's diagram*

This is the deliverable. **Draw it by hand**, from memory, before checking it against this page.

```
  CLIENT                      DNS                     SERVER
  your browser            the phone book          Node + Express
      │                        │                        │
  1 ┌─┴──────────────────┐     │                        │
    │ you type the URL   │     │                        │
    └─┬──────────────────┘     │                        │
      │                        │                        │
  2   ├───"which IP is example.com?"──▶                  │
      │                        │                        │
  3   ◀───────"93.184.216.34"──┤                        │
      │                        ╳  (done — lifeline ends)│
  4   ├───TCP connection, then the TLS handshake────────▶│
      │                                                 │
  5   ├───GET / HTTP/1.1   Host: example.com───────────▶│
      │                                               ┌─┴──────────────┐
  6   │                                               │ matches route, │
      │                                               │ builds a reply │
      │                                               └─┬──────────────┘
  7   ◀───HTTP/1.1 200 OK  +  the HTML─────────────────┤
      │                                                 │
  8   ├───one more request per CSS, JS and image file──▶│
      │                                                 │
  9 ┌─┴──────────────────────────────┐                  │
    │ DOM + CSSOM → render tree →    │                  │
    │ paint                          │                  │
    └────────────────────────────────┘                  │
```

| # | Step | Who acts |
|---|---|---|
| 1 | You type `https://example.com` and press Enter | Client |
| 2 | "Which IP address is example.com?" | Client → DNS |
| 3 | "93.184.216.34" — cached at every level | DNS → Client |
| 4 | TCP connection, then the TLS handshake (the "s" in https) | Client ↔ Server |
| 5 | `GET / HTTP/1.1` with its headers | Client → Server |
| 6 | Matches the route, reads data, builds a reply | Server |
| 7 | `HTTP/1.1 200 OK` + the HTML | Server → Client |
| 8 | One fresh request per CSS, JS and image file | Client → Server |
| 9 | DOM + CSSOM → render tree → pixels | Client |

**Three things to notice:**

1. **The DNS lifeline stops after step 3.** It has done its job — nothing later involves it. That is why steps 4–8 are a clean two-party conversation.
2. **Steps 5–7 are the pair you repeat forever.** Every API call for the next eleven weeks is that request/response pair.
3. **Step 8 is why one page is dozens of requests.** Open DevTools → Network and count them.

---

## 6 · Frontend, backend, and where MERN sits

| | **Frontend** | **Backend** |
|---|---|---|
| **Runs** | In the browser, on the user's machine | On the server, on hardware you rent |
| **Made of** | HTML, CSS, JavaScript | Node.js, Express, MongoDB |
| **Also** | **R** — React, Week 5 | **N** Node · **E** Express · **M** MongoDB |
| **Holds** | What the user sees and touches | The things that must be trusted |

> **Three of MERN's four letters run on the server.** React is the only one in the browser. The surprise for most people is that MERN is mostly a backend stack.

The two sides share **nothing but HTTP** — no shared memory, no shared variables. That single constraint is what lets you replace either side without touching the other.

| Letter | Tool | Side | First appears |
|---|---|---|---|
| **M** | MongoDB | Backend | Week 8 |
| **E** | Express | Backend | Week 7 |
| **R** | React | Frontend | Week 5 |
| **N** | Node.js | Backend | Week 7 |

Week 1 sits *below* all four — plain HTML and CSS, which is what React eventually produces anyway.

---

## 7 · VS Code setup

Download from [code.visualstudio.com](https://code.visualstudio.com/).

**Extensions worth installing today:**

| Extension | Why |
|---|---|
| Live Server | Right-click any HTML file → opens with auto-reload |
| Prettier | Formats on save; ends all arguments about spacing |
| Auto Rename Tag | Rename a `<div>` and its closing tag follows |
| Error Lens | Shows errors inline instead of hiding them in a panel |
| Path Intellisense | Autocompletes paths in `href` and `src` |

**Change three settings now** (`Cmd + ,`): Format On Save → on · Tab Size → 2 · Word Wrap → on

**Shortcuts that save the most time:**

| Shortcut | Does |
|---|---|
| `Cmd + P` | Jump to any file by name |
| `Cmd + Shift + P` | Command palette — everything lives here |
| `Cmd + D` | Select the next copy of what's highlighted |
| `Option + ↑ / ↓` | Move the current line up or down |
| `Cmd + /` | Comment or uncomment |
| `Ctrl + ` ` | Toggle the terminal |

---

## 8 · Vocabulary

| Term | In one line |
|---|---|
| **URL** | The full address: `https://example.com:443/path?query=1#section` |
| **Domain** | The human-readable name — `example.com` |
| **IP address** | The number DNS resolves that name to |
| **Port** | Which program on that machine — `:3000` is Express |
| **Protocol** | The rules of the conversation — `http`, `https`, `ws` |
| **Query string** | Key/value pairs after `?`, visible in the URL |
| **Header** | Metadata about a request or response |
| **Body** | The actual payload — HTML, JSON, an image |
| **Status code** | The server's three-digit verdict |
| **Localhost** | Your own machine — always `127.0.0.1` |
| **Latency** | Time lost to the round trip, not to the work |
| **Cache** | A saved copy, so the next request skips the trip |

---

## 9 · See it happen

This project ships with a small Express server so today's lesson isn't theoretical.

```bash
cd "week 1" && npm install && npm start
```

Then open <http://localhost:3000> and:

1. **Watch your terminal** — one line per request: method, status, duration, URL. That is the server's side of the conversation.
2. **DevTools → Network, then reload** — one row per request. Count them. Click any row to see the real headers from section 3.
3. **DevTools → Console** — `js/request-demo.js` narrates a full round trip.
4. **Visit <http://localhost:3000/nope>** — a real `404`, from `server/middleware/notFound.js`.

> No Node installed? `brew install node` first, or skip the server — `client/index.html` opens directly in a browser.

---

## 10 · Before you close the laptop

**Hand in:**

- [ ] These notes, in your own words
- [ ] The nine-step request diagram, **hand-drawn** — traced doesn't count, the point is recall
- [ ] VS Code installed, with Live Server and Prettier working

**Answer out loud, without looking:**

1. What are the nine steps of a web request?
2. What does DNS actually return?
3. What is the difference between `401` and `403`?
4. Why can the frontend never be trusted with validation?
5. Which MERN letters run on the server?
6. What does `localhost:3000` mean, piece by piece?

Shaky on any of them? Re-read that section — tomorrow builds straight on top.

---

**Tomorrow — Day 2:** HTML structure, headings, text, links, images, lists and tables → a personal bio page with no CSS at all.
