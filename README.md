# GitHub Issues Automation Tests

This repository contains automated tests for GitHub issues using Playwright. The tests cover both UI and API interactions to create, retrieve, and close GitHub issues.

## Prerequisites

Before running the tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Playwright](https://playwright.dev/)
- A valid GitHub personal access token (PAT) with the required permissions

## Setup

1. Clone this repository:
   ```sh
   git clone https://github.com/MariusMsw/github-issues-automation.git
   cd github-issues-automation
2. Install dependencies
    ```
    npm install
3. Create a .env file in the root directory and add your GitHub token:
    ```
    GITHUB_TOKEN=your_personal_access_token

Running the Tests

- UI Tests

    ```
    npx playwright test src/tests/e2eTests.spec.ts
These tests cover:

- Creating an issue via the GitHub UI

- Closing an issue via the UI

- Verifying issue state changes in the UI and API

- API Tests
    ```
    npx playwright test src/tests/apiTests.spec.ts
These tests include:

- Creating an issue and verifying details

- Retrieving issue details

- Closing an issue and verifying status

- Handling edge cases such as missing fields

## Debugging & Logs

To run tests in headed mode (see browser UI):

    npx playwright test --headed

## Folder Structure

```
└── 📁config
    └── config.ts
└── 📁src
    └── 📁api
        └── githubApi.ts
    └── 📁tests
        └── apiTests.spec.ts
        └── e2eTests.spec.ts
└── playwright.config.ts
└── package.json
└── README.md
└── .env-example
```

## Playwright Configuration

Playwright settings can be modified in playwright.config.ts. You can customize:

- Browsers (Chromium, Firefox, WebKit)

- Test timeouts

- Headless mode

## Contribution

Feel free to open pull requests for improvements or report issues.

