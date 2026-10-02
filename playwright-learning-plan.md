# Playwright learning Plan

A browser-automation curriculum focused on Playwright's APIs, test runner, reliability, and framework design. Examples use Playwright Test with TypeScript; Use [The Internet](https://the-internet.hackerearth.com/) for browser exercises, and a local mock server or purpose-built fixture when the site does not expose the required behavior.

Mark a module complete after implementing its exercise and explaining the behavior and tradeoffs.

## Practice Site Map

Use [Dropdown](https://the-internet.hackerearth.com/dropdown), [Checkboxes](https://the-internet.hackerearth.com/checkboxes), [Challenging DOM](https://the-internet.hackerearth.com/challenging_dom), [tables](https://the-internet.hackerearth.com/tables), [Dynamic Controls](https://the-internet.hackerearth.com/dynamic_controls), [Dynamic Loading](https://the-internet.hackerearth.com/dynamic_loading), [Multiple Windows](https://the-internet.hackerearth.com/windows), [Nested Frames](https://the-internet.hackerearth.com/nested_frames), [JavaScript Alerts](https://the-internet.hackerearth.com/javascript_alerts), [Shadow DOM](https://the-internet.hackerearth.com/shadowdom), [Drag and Drop](https://the-internet.hackerearth.com/drag_and_drop), [Hovers](https://the-internet.hackerearth.com/hovers), [File Upload](https://the-internet.hackerearth.com/upload), and [Form Authentication](https://the-internet.hackerearth.com/login).

## Curriculum

### P1. Architecture and execution model
- [ ] Browser, browser context, page, locator, request context, Playwright library versus Playwright Test runner.
- [ ] Context isolation, storage state, browser lifecycle, headed/headless, and browser engines/projects.
- [ ] Exercise: explain the lifetime/isolation of a page and context in one test; run the same smoke test in Chromium, Firefox, and WebKit where available.

### P2. Locators and selector strategy
- [ ] `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`, `getByTestId`, CSS, XPath, locator chaining/filtering, `has`, `hasText`, `nth`, and strictness.
- [ ] Locator re-resolution, accessible names, exact matching, uniqueness, and avoiding brittle implementation selectors.
- [ ] Exercise: locate and act on a specific row/action on Challenging DOM and Sortable Data Tables; prefer role/name locators when suitable.

### P3. Actions and form controls
- [ ] Click/fill/type/press/check/uncheck/selectOption, focus/blur, hover, drag-and-drop, keyboard, mouse, file chooser, and action options.
- [ ] Native select versus custom listbox; multi-select through `selectOption` only when the native control supports it; custom controls require UI interaction.
- [ ] Exercise: select and verify options, toggle checkbox state idempotently, and use keyboard/mouse on the site's controls. Use a local fixture for native multi-select.

### P4. Auto-waiting and actionability
- [ ] Locator auto-waiting, actionability checks, navigation waits, timeout hierarchy, retry behavior, and web-first assertions.
- [ ] Avoid fixed sleeps and arbitrary polling; distinguish action timeout, navigation timeout, expect timeout, and test timeout.
- [ ] Exercise: handle Dynamic Controls and Dynamic Loading without `waitForTimeout`; explain which readiness condition is being awaited.

### P5. Assertions and test design
- [ ] `expect(locator)` web-first assertions, value/text/attribute checks, soft assertions, custom matchers, polling, and assertion scope.
- [ ] `test`, `describe`, hooks, `test.step`, tags, annotations, skip/fixme/fail, retries, and test metadata.
- [ ] Exercise: write independent tests with meaningful steps and assertions on a form and a dynamic page.

### P6. Fixtures and dependency injection
- [ ] Built-in fixtures (`page`, `context`, `browser`, `request`), `test.extend`, fixture dependencies, option fixtures, worker/test scope, teardown.
- [ ] When to use fixtures versus hooks; avoid mutable shared state and overbuilt fixture graphs.
- [ ] Exercise: create a small page-object fixture and a test-scoped data fixture with reliable teardown.

### P7. Page objects and framework structure
- [ ] Page Object Model, component objects, locators versus action methods, test ownership of assertions, and composing rather than inheriting unnecessarily.
- [ ] Configuration, helper boundaries, typed test data, naming, and minimizing indirection.
- [ ] Exercise: model login or a repeated navigation component and keep test assertions visible at the test level.

### P8. Navigation and browser contexts
- [ ] Navigation, URL/load states, popups, tabs, frames, dialogs, permissions, cookies, local/session storage, and storage-state reuse.
- [ ] Popup event ordering, frame locators, dialog handlers, and browser context isolation.
- [ ] Exercise: complete Multiple Windows, Nested Frames, JavaScript Alerts, and Form Authentication flows.

### P9. Network, API, and service integration
- [ ] `page.route`, route fulfill/continue/abort, request/response events, waiting for responses, HAR, and deterministic mocking.
- [ ] `APIRequestContext`, authentication, API setup/teardown, UI-plus-API testing, and keeping environment assumptions explicit.
- [ ] Exercise: mock a response with a local fixture/server; use the site for real UI behavior and avoid relying on its external backend for mock-specific scenarios.

### P10. Files, downloads, and browser capabilities
- [ ] File chooser and `setInputFiles`, downloads and saved paths, tracing artifacts, geolocation, viewport/device emulation, and browser launch options.
- [ ] Exercise: upload a fixture on File Upload and validate a download in a temporary directory; configure geolocation only where the page supports it.

### P11. Dynamic content, Shadow DOM, and accessibility
- [ ] Re-rendering, locator resilience, Shadow DOM piercing behavior, infinite scroll, overlays, and layout changes.
- [ ] Role/name-based testing and accessibility snapshots/checks; browser automation does not replace a complete accessibility audit.
- [ ] Exercise: use Dynamic Content, Shifting Content, Infinite Scroll, and Shadow DOM; explain locator strategy after a re-render.

### P12. Configuration, projects, and environments
- [ ] `playwright.config.ts`, projects, `use` options, `baseURL`, `testMatch`, retries, workers, grep, timeouts, reporters, and environment config.
- [ ] Browser matrix, setup projects/dependencies, global setup, auth state, and configuration precedence.
- [ ] Exercise: define a small Chromium/Firefox project matrix and a setup step with deterministic state.

### P13. Debugging, tracing, and reporting
- [ ] Inspector, UI mode, headed/debug runs, trace viewer, screenshots, video, console/page errors, network logs, and HTML reports.
- [ ] Failure artifacts, trace retention policy, test steps, and using evidence to find the underlying cause rather than just increasing timeout.
- [ ] Exercise: intentionally fail one assertion, inspect the trace, and identify the earliest incorrect state.

### P14. Parallelism, isolation, and reliability
- [ ] Workers, fully-parallel execution, test isolation, worker fixtures, serial mode risks, retries, sharding, and deterministic test data.
- [ ] Shared account/resource collisions, idempotent cleanup, per-worker data, and why retries can hide defects.
- [ ] Exercise: run independent site tests in parallel; document which state must be unique and which can be safely shared.

### P15. CI, remote execution, and scale
- [ ] Browser installation/cache, Linux dependencies, containers, CI artifacts, sharding, reporting, secrets, and test selection.
- [ ] Remote browser services, browser/version pinning, suite runtime, flaky-test ownership, and smoke/regression strategy.
- [ ] Exercise: define a minimal CI command and artifact policy; actual CI requires a runner configuration outside the practice site.

## Completion Checklist

- [ ] Implement locators, actions, assertions, waits, contexts, dialogs, frames, and uploads against matching site pages.
- [ ] Use local fixtures/mocks where the site lacks a behavior, especially API interception and true multi-select.
- [ ] Demonstrate trace-based failure diagnosis, parallel isolation, and a multi-browser project configuration.