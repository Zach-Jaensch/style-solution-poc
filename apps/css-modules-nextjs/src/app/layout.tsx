import "@internal/css-modules-component-lib/styles.css";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
