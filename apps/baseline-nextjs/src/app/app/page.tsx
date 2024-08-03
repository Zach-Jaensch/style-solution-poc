import { Button } from "./_components/button";

async function handleClick() {
  "use server";

  console.log("clicked");
}

export default function Page() {
  return (
    <form action={handleClick}>
      <Button type="submit">Click Me</Button>
    </form>
  );
}
