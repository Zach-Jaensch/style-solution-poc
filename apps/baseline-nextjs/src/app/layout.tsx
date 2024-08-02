import { StyledComponentsRegistry } from "./_components/styled-reg";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
