# Zod Schema

The Zod Schema package is a collection of zod schemas describing the APIs we use that are not typed or where we provide custom objects for use.

This package is not published and is only available inside this workspace

## Installation

To install the Zod Schema package, you can add the following to the dependencies in your package:

```json
"@internal/zod-schema": "workspace:*",
```

and run

```bash
pnpm install
```

## Usage

Here's a simple example of how to use Zod Schema parse data:

```typescript
import { searchResponseSchema } from "@internal/zod-schema/algolia-search";

const result = await fetch("some API").then((response) => response.json());

const parsedResult = searchResponseSchema.parse(result);
```

Or you can use it to mock data:

```typescript
import { generateMock } from "@anatine/zod-mock";
import { searchResponseSchema } from "@internal/zod-schema/algolia-search";

const result = await fetch("some API").then((response) => response.json());

const mockData = generateMock(searchResponseSchema);
```

For more information on how to use Zod Schema, please refer to the [official documentation](https://zod.dev/).

When making updates to this package, you must re-install it in your app/package
