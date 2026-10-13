# Playwright Microservice API Framework

A lightweight TypeScript test-automation scaffold for the
[Restful Booker Platform](https://automationintesting.online/) microservices, using Playwright's
built-in API request context.

## What is included

- Playwright Test for API execution, assertions, reports, retries, and fixtures
- TypeScript in strict mode
- Zod for runtime contract validation
- Typed auth, booking, and room API clients
- Strict runtime validation for success and error response contracts
- Reusable and deterministic booking-data builders
- Smoke tests plus positive and negative authentication coverage
- ESLint, Prettier, environment configuration, and GitHub Actions CI

## Getting started

Prerequisites: Node.js 20 or newer.

```bash
nvm use                 # optional; reads the included .nvmrc
npm install
cp .env.example .env
npm run test:smoke
```

The default URL targets the public platform. To test a local Restful Booker Platform instance,
change `API_BASE_URL` in `.env` to `http://localhost:3003/api`.

Useful commands:

```bash
npm test               # run the complete suite
npm run test:smoke     # run tests tagged @smoke
npm run test:booking   # run booking API tests
npm run test:data      # run test-data builder unit tests
npm run test:room      # run room API tests
npm run typecheck      # check TypeScript
npm run lint           # check code quality
npm run report         # open the last HTML report
```

API-only tests do not require Playwright browser binaries. Install browsers later only if this
repository grows to include UI tests.

## Test reports

Every Playwright test command generates the following reports:

- A concise list report in the terminal
- An HTML report at `playwright-report/index.html`
- A JUnit XML report at `test-results/junit.xml` for CI and test-management integrations

Open the most recent HTML report locally with:

```bash
npm run report
```

When a test fails, Playwright retains its trace under `test-results/`. Open a trace with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

The GitHub Actions workflow uploads the HTML report as the `playwright-report` artifact after every
CI run, including failed runs, and retains it for 14 days. Generated reports and test results are
excluded from Git so they are not committed to the repository.

## Adding the first booking workflow

Use the existing `AuthClient` to obtain a token, `buildBooking()` to create unique test data, and
`BookingClient` to create/read/update/delete the booking. Keep assertions in the spec and HTTP
details in the client. Always delete records created by a test in a `finally` block so the shared
training environment stays clean.
