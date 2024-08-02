import "@internal/tailwind-component-lib/style.css";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
