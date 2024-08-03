import { Button } from "@internal/tailwind-component-lib/button";

export default function Page() {
  return (
    <Button className="something red" onClick={console.log}>
      Click Me
    </Button>
  );
}
