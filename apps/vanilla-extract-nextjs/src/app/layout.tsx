import "@internal/vanilla-extract-component-lib/style.css";
import { themeClass } from "@internal/vanilla-extract-component-lib/styled";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={themeClass}>{children}</body>
    </html>
  );
}
