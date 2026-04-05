/**
 * Minimal root layout for the Sanity Studio route.
 * Next.js requires every route segment to have a root layout
 * that renders <html> and <body> tags.
 */
export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
