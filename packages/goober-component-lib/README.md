# Baseline component lib

This package is a reflection of the current state of sc-web-ui using styled-components v5

## Installation

To install this package, you can add the following to the dependencies in your app:

```json
"@internal/baseline-component-lib": "workspace:*",
```

and run

```bash
pnpm install
```

## Usage

Here's a simple example of how to use this package:

```tsx
import { Button } from "@internal/baseline-component-lib/button";

export function SomeComponent() {
  function handleClick() {
    /*
     * Do something
     */
  }

  return (
    <Button onClick={handleClick}>
      Click me
    </Button>
  )
}
```

When making updates to this package, you must re-install it in your app/package
