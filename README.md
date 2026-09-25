# Playwright Microservice API Framework

A lightweight TypeScript test-automation scaffold for the
[Restful Booker Platform](https://automationintesting.online/) microservices, using Playwright's
built-in API request context.

## What is included

- Playwright Test for API execution, assertions, reports, retries, and fixtures
- TypeScript in strict mode
- Zod for runtime contract validation
- Typed auth and booking API clients
- Reusable test-data factory
- Smoke and authentication starter tests
- ESLint, Prettier, environment configuration, and GitHub Actions CI

## Project structure

```text
.
├── .github/workflows/       # CI pipeline
├── src/
│   ├── clients/             # HTTP calls grouped by microservice
│   ├── config/              # Validated environment configuration
│   ├── contracts/           # API types and runtime schemas
│   └── data/                # Test-data builders
├── tests/
│   ├── auth/                # Authentication scenarios
│   ├── fixtures/            # Shared Playwright fixtures
│   └── smoke/               # Fast service checks
├── .env.example
├── playwright.config.ts
└── tsconfig.json
```

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
npm run typecheck      # check TypeScript
npm run lint           # check code quality
npm run report         # open the last HTML report
```

API-only tests do not require Playwright browser binaries. Install browsers later only if this
repository grows to include UI tests.

## Adding the first booking workflow

Use the existing `AuthClient` to obtain a token, `buildBooking()` to create unique test data, and
`BookingClient` to create/read/update/delete the booking. Keep assertions in the spec and HTTP
details in the client. Always delete records created by a test in a `finally` block so the shared
training environment stays clean.

## Suggested GitHub repository

- Repository name: `playwright-microservice-api-framework`
- Description: `Playwright + TypeScript API automation framework for the Restful Booker Platform`
- Suggested topics: `playwright`, `typescript`, `api-testing`, `test-automation`, `microservices`

Do not commit `.env`, reports, test output, or real credentials. The credentials in
`.env.example` are the documented public training credentials for Restful Booker Platform.
