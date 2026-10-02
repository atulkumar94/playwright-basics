# Playwright Basics

Runnable Playwright Test + TypeScript examples, one spec file per topic. Every spec runs against the public fixture site [the-internet.hackerearth.com](https://the-internet.hackerearth.com), mirroring the companion Selenium project but using Playwright idioms (locators, auto-waiting, web-first assertions, fixtures, projects).

The curriculum it follows is in [playwright-learning-plan.md](playwright-learning-plan.md).

## Tech stack

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| Playwright Test | ^1.49 |
| TypeScript | ^5.7 |
| Browsers | Chromium, Firefox, WebKit (installed by `npx playwright install`) |

## Project layout

```
.
├── playwright.config.ts          # projects, baseURL, timeouts, artifacts
├── tsconfig.json
├── pages/
│   └── forgotPassword.page.ts     # page object used by P6/P7
├── fixtures/
│   ├── test-fixtures.ts           # custom test.extend fixtures (P6)
│   └── sample-upload.txt          # upload fixture (P10)
└── tests/
    ├── base.ts                    # shared constants
    └── p01…p15*.spec.ts           # one spec per topic
```

## Setup

```bash
npm install
npx playwright install            # download the browser binaries
```

## Running the tests

```bash
npm test                          # all specs on chromium, firefox and webkit
npm run test:headed               # run with visible browser windows
npm run test:chromium             # one project only (chromium | firefox | webkit)
npx playwright test tests/p04-auto-waiting.spec.ts   # one spec
npx playwright test -g "popup"    # filter by title
npx playwright test --ui          # interactive UI mode (great for debugging)
npm run report                    # open the last HTML report
npm run typecheck                 # tsc --noEmit
```

## Configuration

[playwright.config.ts](playwright.config.ts) is the single place that sets up every run:

- **Projects** — the same specs run on Chromium, Firefox and WebKit.
- **`baseURL`** — specs navigate with relative paths like `/dropdown`.
- **Isolation** — `fullyParallel` is on; each test gets its own browser context, which is what makes parallel runs safe (the Playwright equivalent of "one WebDriver per test" in the Selenium project).
- **Timeouts** — test timeout, `expect` timeout, action and navigation timeouts are separate knobs.
- **Artifacts** — trace on first retry, screenshot and video on failure.
- **CI** — `retries` and `workers` increase when `process.env.CI` is set.

## Topics

| # | Spec | Topic | What the tests show |
|---|------|-------|---------------------|
| P1 | [p01-architecture](tests/p01-architecture.spec.ts) | Architecture and execution model | Page lifecycle, context isolation, engine per project |
| P2 | [p02-locators](tests/p02-locators.spec.ts) | Locators and selector strategy | Role/text/CSS/XPath, chaining, filtering, strictness |
| P3 | [p03-actions-forms](tests/p03-actions-forms.spec.ts) | Actions and form controls | Idempotent check, `selectOption`, native multi-select fixture, hover, keyboard |
| P4 | [p04-auto-waiting](tests/p04-auto-waiting.spec.ts) | Auto-waiting and actionability | Dynamic Controls / Dynamic Loading without `waitForTimeout` |
| P5 | [p05-assertions](tests/p05-assertions.spec.ts) | Assertions and test design | Web-first assertions, soft assertions, `test.step` |
| P6 | [p06-fixtures](tests/p06-fixtures.spec.ts) | Fixtures and dependency injection | `test.extend` page-object and data fixtures |
| P7 | [p07-page-objects](tests/p07-page-objects.spec.ts) | Page objects and framework structure | Page Object Model with assertions kept in the test |
| P8 | [p08-navigation-contexts](tests/p08-navigation-contexts.spec.ts) | Navigation and browser contexts | Popups, nested frames, JS dialogs, a form flow |
| P9 | [p09-network-api](tests/p09-network-api.spec.ts) | Network, API and service integration | `page.route` fulfill/modify, `APIRequestContext` |
| P10 | [p10-files-downloads](tests/p10-files-downloads.spec.ts) | Files, downloads and capabilities | `setInputFiles`, downloads, geolocation emulation |
| P11 | [p11-dynamic-shadow](tests/p11-dynamic-shadow.spec.ts) | Dynamic content, Shadow DOM, accessibility | Re-render resilience, shadow piercing, infinite scroll, roles |
| P12 | [p12-config-projects](tests/p12-config-projects.spec.ts) | Configuration, projects, environments | `testInfo`, `baseURL`, browser matrix |
| P13 | [p13-debugging-tracing](tests/p13-debugging-tracing.spec.ts) | Debugging, tracing, reporting | Steps and report attachments |
| P14 | [p14-parallelism](tests/p14-parallelism.spec.ts) | Parallelism, isolation, reliability | Context isolation, worker/parallel index |
| P15 | [p15-ci-scale](tests/p15-ci-scale.spec.ts) | CI, remote execution, scale | Smoke gate and environment-driven config |

## Notes on the practice site

- This mirror replaces the-internet's `/login` (Form Authentication) with HackerEarth's own login page. Where the plan calls for a login flow, the specs use the reachable `/forgot_password` form instead, and the page object models that form.
- The site has no true native multi-select, so P3 builds a local `<select multiple>` fixture with `page.setContent`.
- P9 mocks responses locally with `page.route` rather than depending on the site's backend.

## Parallel execution vs. Selenium

Unlike Selenium (which relies on the test runner, e.g. JUnit, for parallelism), Playwright Test has a built-in parallel runner. `fullyParallel: true` plus per-test context isolation gives safe concurrency out of the box. Scale out with `--workers=N` locally and `--shard=i/n` across CI machines.
