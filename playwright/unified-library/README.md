# `unified-library-tests` Playwright test suite

This is a [Playwright](https://playwright.dev/) project.

## Getting started

### Running tests

To run the e2e test suite:

```bash
pnpm e2e
```

> [!TIP]
> This will start the app in dev mode if it isn't already running.

You can also run against all supported browsers in headless mode:

```bash
pnpm e2e:headless
```

You can then view the test report from the headless run:

```bash
pnpm e2e:report
```

### Generating tests

The Playwright test generator is available via the VS Code extension.

You can also access it via this command:

```bash
pnpm e2e:codegen
```

## Learn more

To learn more about Playwright, take a look at the following resources:

- [Playwright documentation](https://playwright.dev/docs/intro) - learn about Playwright features and APIs.
- [Writing tests](https://playwright.dev/docs/writing-tests) - learn how to write Playwright tests.
- [Codegen intro](https://playwright.dev/docs/codegen-intro) - learn how to generate Playwright tests with codegen.
- [Debugging tests](https://playwright.dev/docs/debug) - learn how to debug tests via VS Code or the CLI.
