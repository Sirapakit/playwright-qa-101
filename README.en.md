# Playwright for Manual QA — Learner Guide

Welcome! This is a small practice project for learning [Playwright](https://playwright.dev),
a tool that lets you write automated browser tests in JavaScript.

You will test a tiny demo website that lives in this project (`demo-site/`), so **you don't need
internet access** and the site never changes under you — every run behaves the same way.

Test account: **`qa_user` / `test1234`**

---

## 1. Set up (once)

1. Install [Node.js](https://nodejs.org) version 18 or newer.
2. Open a terminal in this folder and run:
   ```
   npm install
   npx playwright install chromium
   ```
   The first command downloads Playwright; the second downloads the Chromium browser it drives.
3. Check that everything works:
   ```
   npm test
   ```
   You should see `7 passed, 1 skipped`. The skipped one is your exercise — it's supposed to be
   skipped until you write it.

---

## 2. Start the demo website

```
npm run start
```

This prints the address of the demo site and keeps serving it. Leave this terminal open and
open a **second** terminal for everything else.

```
  Demo site: http://localhost:5173/login.html
```

Open that link in your browser and click around: log in, add items to the cart. Knowing how the
site behaves by hand makes the test code much easier to read.

> You only need this for `npm run codegen` and for browsing by hand. `npm test` starts the site
> automatically.

---

## 3. See tests run visually (UI mode)

```
npm run test:ui
```

UI mode opens a window where you can pick a test, run it, and watch each step with a screenshot
of the page at that moment. This is the best way to understand what a test is actually doing.

---

## 4. The basic commands

Open `tests/00-commands-tour.spec.js`. It contains four small tests, each one demonstrating one
idea. Run them one at a time in UI mode and read along.

**Open a page**
```js
await page.goto('/login.html');
```

**Find something on the page (a "locator")**
```js
page.getByRole('button', { name: 'Login' })   // by its role + visible name — prefer this one
page.getByPlaceholder('Username')             // by the grey hint text inside an input
page.getByText('QA Demo Shop')                // by the text it displays
```
`getByRole` is preferred because it matches how a user (and a screen reader) perceives the page,
so it keeps working when styling or markup changes.

**Do something**
```js
await page.getByPlaceholder('Username').fill('qa_user');
await page.getByRole('button', { name: 'Login' }).click();
```

**Check something (an "assertion")**
```js
await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
await expect(page.locator('#cart-badge')).toHaveText('0');
await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(3);
```

Two rules that cover most beginner mistakes:

- Put `await` in front of every action and every `expect(...)` — they all take time to finish.
- You do **not** need to add waits or sleeps. Playwright waits for elements by itself.

Then open `tests/login.spec.js` to see the same commands combined into one realistic scenario
from start to finish.

---

## 5. Let Playwright write code for you (codegen)

With the demo site running (step 2), in your second terminal:

```
npm run codegen
```

A browser opens alongside a code window. Everything you click and type is turned into Playwright
code live. Try logging in and adding something to the cart.

Codegen is a great starting point, but treat its output as a draft: rename things, remove
duplicate steps, and swap brittle locators for `getByRole` before keeping it.

---

## 6. Your turn — the exercise

Open `tests/exercise.spec.js`.

**Goal:** add two products to the cart, then verify the cart badge shows `2`.

Steps:
1. Remove `.fixme` from `test.fixme(...)` so the test actually runs.
2. Write your code inside the test body. Hints are in the comments at the top of the file.
3. Run it until it passes:
   ```
   npm run test:ui
   ```

Stuck? A worked solution is in the comment block at the bottom of the same file — try it yourself
first, it's where the learning happens.

---

## 7. Writing tests with AI help

You can describe a scenario in plain language and ask Claude to draft the test for you, for example:

> "Write a Playwright test: log in as qa_user, add the first product to the cart, and check the
> cart badge shows 1. Use role-based locators."

Always run what you get back and read it line by line. AI is good at the boilerplate; deciding
*what is worth testing* stays your job as a QA.

---

## 8. Playwright MCP — letting the AI drive the browser

In step 7 the AI is guessing from code it can read. **Playwright MCP** goes further: it gives your
AI assistant a real browser it can open, click and read for itself. So instead of guessing a
locator, it looks at the actual page and uses what's really there.

MCP (Model Context Protocol) is just the standard that lets a tool plug into an AI assistant.
Playwright ships one, so the assistant gets browser tools: navigate, click, type, screenshot,
read the page.

### Setting it up

This project already includes a `.mcp.json`, so opening the folder in Claude Code will offer to
enable the server — approve it once and you're done. To add it by hand instead:

```
claude mcp add playwright npx @playwright/mcp@latest
```

Check it worked by typing `/mcp` — you should see `playwright` listed as connected. The browser
downloads itself the first time it runs.

### Try it

Start the demo site first (`npm run start`), then ask in plain language:

> "Open http://localhost:5173/login.html and tell me what's on the page."

> "Log in as qa_user / test1234, add the first product to the cart, and check the badge."

> "Now write that as a Playwright test in tests/mcp-demo.spec.js and run it until it passes."

Watch what comes back from the first prompt: the page is described as **roles and names** —
button "Login", textbox "Username". That is exactly what `getByRole` matches, which is why
role-based locators are the ones we recommend. The AI sees the page the same way a screen
reader does.

### Where it fits — and where it doesn't

MCP is for **exploring and drafting**. It is slow, costs tokens, and won't give identical results
every run, so it is the wrong tool for your CI pipeline. What ships is the reviewed `.spec.js`
file it helped you write — that part runs in seconds and behaves the same way every time.

Two habits worth keeping:

- **Read every generated test before trusting it.** A test that passes for the wrong reason is
  worse than no test — like [tests/first-test.spec.js](tests/first-test.spec.js) in this project,
  which has no assertion at all and therefore can never fail.
- **Don't point MCP at production** or anything holding real customer data. Use a local site like
  this one, or a staging environment.

---

## Command cheat sheet

| Command | What it does |
| --- | --- |
| `npm install` | Install project dependencies (once) |
| `npx playwright install chromium` | Download the browser (once) |
| `npm run start` | Serve the demo site and print its URL |
| `npm test` | Run all tests in the terminal |
| `npm run test:ui` | Run tests in the visual UI mode |
| `npm run codegen` | Record your clicks as test code |
| `npx playwright test --project=chrome` | Run on real Google Chrome instead of bundled Chromium |

## What's in this project

```
playwright-demo/
├── demo-site/                       the local demo website (login.html, products.html)
├── tests/
│   ├── 00-commands-tour.spec.js     the basic commands, one per test
│   ├── login.spec.js                a full example scenario
│   └── exercise.spec.js             your exercise + solution at the bottom
├── playwright.config.js             Playwright settings (base URL, browsers, auto-start server)
├── .mcp.json                        Playwright MCP setup for Claude Code (section 8)
└── package.json                     the npm commands above
```

## When something goes wrong

| You see | Try this |
| --- | --- |
| `Address already in use` after `npm run start` | The site is already running in another terminal — just use it. |
| `browserType.launch: Executable doesn't exist` | Run `npx playwright install chromium`. |
| A test hangs, then fails on a locator | The element was never found. Check the name/text you typed, and watch the step in UI mode. |
| `page.goto` fails | Nothing is serving the site — but `npm test` starts it for you, so check the port isn't blocked. |

Note for the original Thai instructions, see [README.md](README.md).
