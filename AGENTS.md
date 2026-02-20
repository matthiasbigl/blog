# AGENTS.md - Coding Agent Guidelines

## Build/Lint/Test Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build (includes type checking)
npm run start        # Start production server
npx prettier --write .   # Format all files
npx prettier --check .   # Check formatting
npx tsc --noEmit     # Type check without emitting files
```

**Note**: This project has no automated tests configured. All testing is manual via the dev server.

## Project Overview

- **Framework**: Next.js 15 with Pages Router
- **Language**: Mixed TypeScript (.tsx) and JavaScript (.jsx/.js)
- **CMS**: GraphCMS (GraphQL backend)
- **Styling**: Tailwind CSS v3 + SCSS globals
- **Animations**: Framer Motion
- **Theme**: Dark/Light mode with class-based toggle

## Code Style Guidelines

### Prettier Configuration

```js
singleQuote: true
semi: false
```

- Use single quotes for strings
- No semicolons at end of statements
- Trailing commas in multi-line structures

### Imports

Group imports in this order:

```javascript
// 1. React/Next.js core
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// 2. Third-party libraries
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import moment from 'moment'

// 3. Internal services
import { getPosts, getCategories } from '../services'

// 4. Internal components (use barrel exports)
import { Header, Footer, PostCard } from '../components'

// 5. Styles (always last)
import '../styles/globals.scss'
```

### Component Structure

- Use arrow function components for JSX files
- Default export for all components
- Named exports only for barrel files (index.ts)

```jsx
const ComponentName = ({ prop }) => {
    // hooks at top
    const [state, setState] = useState(initialValue)

    // effects
    useEffect(() => {
        // side effects
    }, [dependencies])

    // handlers
    const handleClick = () => {
        // handler logic
    }

    return (
        // JSX
    )
}

export default ComponentName
```

### TypeScript

- Strict mode enabled (`strict: true`)
- Use explicit types for props in TSX files
- Use `any` sparingly, prefer specific types

```typescript
interface ComponentProps {
  title: string
  slug: string
  image?: string // optional
  items: string[]
}

const Component = ({ title, slug, image, items }: ComponentProps) => {
  // ...
}
```

### Naming Conventions

| Type            | Convention                | Example                     |
| --------------- | ------------------------- | --------------------------- |
| Components      | PascalCase                | `PostCard`, `FeaturedPosts` |
| Functions       | camelCase                 | `getPosts`, `handleSubmit`  |
| Constants       | camelCase                 | `graphqlAPI`                |
| Files           | PascalCase for components | `Header.jsx`                |
| Folders         | camelCase                 | `components/`, `sections/`  |
| GraphQL queries | PascalCase                | `GetPostDetails`, `MyQuery` |

### Tailwind CSS

- Use semantic color tokens from `tailwind.config.js`:
  - `dark-bg`, `dark-card`, `dark-text`, `dark-muted`, `dark-border`
  - `light-bg`, `light-card`, `light-text`, `light-muted`, `light-border`
  - `primary`, `accent`
- Dark mode: always use `dark:` prefix for dark theme variants
- Use `clsx` or `tailwind-merge` for conditional classes

```jsx
<div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
```

### Error Handling

- Use try/catch in async functions
- For GraphQL errors, implement retry with exponential backoff
- Return `{ notFound: true }` for missing data in `getStaticProps`

```javascript
try {
  const data = await getPostDetails(slug)
  if (!data) {
    return { notFound: true }
  }
  return { props: { data } }
} catch (error) {
  console.warn('Error fetching data:', error)
  return { notFound: true, revalidate: 60 }
}
```

### Barrel Exports

Use `index.ts`/`index.js` for clean imports:

```typescript
// components/index.ts
export { default as PostCard } from './PostCard'
export { default as Header } from './Header'
```

```javascript
// Usage in other files
import { PostCard, Header } from '../components'
```

### GraphQL Services

- All GraphQL queries in `services/index.js`
- Use `gql` tagged template literals
- Named exports for all service functions
- Handle rate limiting (429) with retries in SSR functions

### Next.js Patterns

- Use `getStaticProps` with ISR (`revalidate: 60`) for blog posts
- Use `getStaticPaths` with `fallback: 'blocking'` for dynamic routes
- SEO component (`components/SEO.jsx`) for all page-level meta tags
- Theme context in `_app.tsx` for dark/light mode

### Environment Variables

Required environment variables:

```
NEXT_PUBLIC_GRAPHCMS_ENDPOINT=<graphql-endpoint>
GRAPHCMS_TOKEN=<api-token>  # For mutations only
```

## File Structure

```
blog/
├── components/       # Reusable UI components
│   ├── index.ts      # Barrel exports
│   └── *.jsx         # Component files
├── sections/         # Page sections (larger components)
│   ├── index.js      # Barrel exports
│   └── *.jsx         # Section components
├── pages/            # Next.js pages
│   ├── _app.tsx      # App wrapper, global providers
│   ├── _document.tsx # Custom HTML document
│   ├── api/          # API routes
│   ├── post/[slug].jsx
│   └── category/[slug].js
├── services/         # GraphQL queries and API calls
│   └── index.js
├── styles/
│   └── globals.scss  # Global styles
├── public/           # Static assets
└── tailwind.config.js
```

## SEO Requirements

- Every page must use the `<SEO />` component
- Include JSON-LD structured data via SEO component
- Static files required: `robots.txt`, `sitemap.xml`, `feed.xml`, `llms.txt`

## Security Notes

- Never commit `.env` or secrets
- API tokens only in server-side code (`pages/api/` or `getStaticProps`)
- Security headers configured in `next.config.js`
