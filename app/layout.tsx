// app/layout.tsx
import './globals.css'; // ← add this line
import { Analytics } from "@vercel/analytics/react"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}
      <Analytics />
      </body>
    </html>
  );
}
