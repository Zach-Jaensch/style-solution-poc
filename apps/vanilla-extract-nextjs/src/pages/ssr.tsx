import { Bu } from "@internal/vanilla-extract-component-lib/button";

export default function Page() {
  console.log("Page rendered ");
  return <Bu onClick={console.log}>Click Me twice</Bu>;
}
