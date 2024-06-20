# `frontend-unified-library` monorepo

- [Apps](#apps)
- [Packages](#packages)
- [Getting set up](#getting-set-up)
  - [Prerequisites](#prerequisites)
  - [Setting up Node.js](#setting-up-nodejs)
  - [Setting up the package manager](#setting-up-the-package-manager)
  - [Installing packages](#installing-packages)
  - [Troubleshooting](#troubleshooting)
- [Using this repository](#using-this-repository)
  - [Running commands from packages](#running-commands-from-packages)
  - [Running commands from the workspace](#running-commands-from-the-workspace)

## Apps

| Name                                                    | Description                      |
| ------------------------------------------------------- | -------------------------------- |
| [`unified-library-app`](apps/unified-library/README.md) | The Unified Library Next.js app. |

## Packages

| Name                                                                  | Description                         |
| --------------------------------------------------------------------- | ----------------------------------- |
| [`@internal/eslint-config`](packages/eslint-config/README.md)         | A set of ESLint configurations.     |
| [`@internal/typescript-config`](packages/typescript-config/README.md) | A set of TypeScript configurations. |

## Getting set up

This guide is designed to get you up and running in this repo quickly.

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

To install all packages for this repo, run:

```bash
pnpm i
```

At this stage, you should be able to run scripts in this repo. To confirm, try
running Prettier:

```bash
pnpm prettier
```

## Using this repository

### Running commands from packages

If you `cd` into a an package (or app) folder, you can run any scripts in that
package with:

```bash
pnpm [script-name]
```

For example, to run ESLint:

```bash
pnpm eslint
```

### Running commands from the workspace

From the workspace, or the root of the repository, you can run commands with pnpm's
`--filter` and `--recursive` options.

For example, to run ESLint for just the `unified-library` app:

```bash
# Using `--filter`
pnpm --filter unified-library-app eslint

# Using the `-F` alias
pnpm -F unified-library-app eslint
```

For example, to run ESLint in each package with an `eslint` script:

```bash
# Using `--recursive`
pnpm --recursive eslint

# Using the `-r` alias
pnpm --r eslint
```
