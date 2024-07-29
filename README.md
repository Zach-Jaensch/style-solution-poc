# `frontend-unified-library` monorepo

- [Apps](#apps)
- [Packages](#packages)
- [Getting set up](#getting-set-up)
  - [Prerequisites](#prerequisites)
  - [Setting up Node.js](#setting-up-nodejs)
  - [Setting up the package manager](#setting-up-the-package-manager)
  - [Installing packages](#installing-packages)
  - [Setting up Turborepo](#setting-up-turborepo)
  - [Troubleshooting](#troubleshooting)
- [Working in this repository](#working-in-this-repository)
  - [Running commands from the workspace](#running-commands-from-the-workspace)
  - [Running commands from packages](#running-commands-from-packages)

## Apps

| Name                                                    | Description                      |
| ------------------------------------------------------- | -------------------------------- |
| [`unified-library-app`](apps/unified-library/README.md) | The Unified Library Next.js app. |

## Packages

| Name                                                                  | Description                                                |
| --------------------------------------------------------------------- | ---------------------------------------------------------- |
| [`@internal/commonality`](packages/commonality/README.md)             | Custom repository checks for Commonality.                  |
| [`@internal/eslint-config`](packages/eslint-config/README.md)         | A set of ESLint configurations.                            |
| [`@internal/typescript-config`](packages/typescript-config/README.md) | A set of TypeScript configurations.                        |
| [`@internal/zod-schema`](packages/zod-schema/README.md)               | A collection of schemas to describe untyped external APIs. |

## Playwright tests

| Name                                                            | Description                                |
| --------------------------------------------------------------- | ------------------------------------------ |
| [`unified-library-tests`](playwright/unified-library/README.md) | The Unified Library Playwright test suite. |

## Getting set up

This guide is designed to get you up and running in this repository quickly.

Packages and apps may have additional instructions.

> [!WARNING]
> This section of the README should be followed in order.

### Prerequisites

Before continuing, you need to make sure you've set up your local machine with
access to GitHub Packages.

This guide explains how to do that: https://safetyculture.atlassian.net/l/cp/rW0h0CTr

### Setting up Node.js

If you're using `fnm` or `nvm` with automatic version selection, your version
should have been selected already.

If you haven't done that, please enable automatic version selection:

- `fnm`: https://github.com/Schniz/fnm/blob/master/docs/configuration.md#--use-on-cd
- `nvm`: https://github.com/nvm-sh/nvm?tab=readme-ov-file#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file

### Setting up the package manager

Once Node.js is installed, you can use [Corepack](https://nodejs.org/api/corepack.html)
to set up the correct package manager and version.

```bash
corepack enable
```

_Corepack will also helpfully stop you from accidentally using the wrong
package manager._

### Installing packages

> [!TIP]
> This step will fail if you haven't completed the [prerequisites](#prerequisites).

To install all packages for this repository, run:

```bash
pnpm i
```

At this stage, you should be able to run scripts in this repository. To
confirm, try running Prettier:

```bash
pnpm prettier
```

### Setting up Turborepo

We use [Turborepo](https://turbo.build/repo/docs) for task caching, both
locally and in the CI. To get the most from Turborepo, you should connect to
the remote cache.

First, log in to Turborepo (via Vercel):

```bash
pnpm turbo login
```

Once logged in, you can connect your local project by selecting the
SafetyCulture scope:

```bash
pnpm turbo link
# Select "Yes"
# Select "SafetyCulture Marketplace Global"
```

## Working in this repository

### Running commands from the workspace

From the workspace, or the root of the repository, you can run commands with
Turborepos's `--filter` option.

For example, to run ESLint for just the `unified-library` app:

```bash
# Using `--filter`
pnpm turbo --filter unified-library-app eslint

# Using the `-F` alias
pnpm turbo -F unified-library-app eslint
```

The `--filter` option can be used multiple times, and also accepts
partial matches:
(i.e. `--filter "@internal/*"`)

```bash
# Running a command on two packages only
pnpm turbo --filter unified-library-app --filter @internal/eslint-config eslint

# Running a command on all packages wit the `@internal/` scope
pnpm turbo --filter @internal/* eslint
```

### Running commands from packages

> [!NOTE]
> In most cases you'll find a script in the workspace `package.json` that will
> do what you need.

If you `cd` into a an package (or app) folder, you can run any scripts in that
package with:

```bash
pnpm turbo [script-name]
```

For example, to run ESLint:

```bash
pnpm turbo eslint
```
