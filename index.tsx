// This file serves as an entry point reference
// In Next.js App Router, the actual rendering happens through app/layout.tsx
// which uses the App component to wrap all pages

import App from './components/App'
import Home from './app/page'

export default function Index() {
  return (
    <App>
      <Home />
    </App>
  )
}

// Note: This file is for reference. Next.js uses app/layout.tsx and app/page.tsx
// The App component is already integrated in app/layout.tsx

