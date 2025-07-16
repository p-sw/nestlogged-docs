# Technology Stack

## Core Framework
- **React 19** with TypeScript
- **Vite** as build tool and dev server
- **TanStack Router** for file-based routing with auto-generation
- **pnpm** as package manager

## UI & Styling
- **Tailwind CSS v4** for styling
- **Shadcn/ui** component library (New York style)
- **Radix UI** primitives for accessible components
- **Lucide React** for icons
- **unplugin-icons** for additional icon support

## Documentation
- **MDX** for rich documentation content
- **Rehype plugins** for slug generation and TOC extraction
- Custom docs builder script for MDX compilation

## Development Tools
- **TypeScript** with strict configuration
- **Vitest** for testing with jsdom environment
- **ESLint** and code quality tools
- **TanStack Router Devtools** for development

## Common Commands

```bash
# Development
pnpm dev              # Start dev server on port 3000
pnpm route:watch      # Watch and regenerate routes

# Building
pnpm build            # Build for production (Vite + TypeScript)
pnpm build:docs       # Compile MDX documentation files
pnpm build:scripts    # Compile TypeScript scripts

# Testing
pnpm test             # Run Vitest tests

# Route Management
pnpm route            # Generate route tree
```

## Path Aliases
- `@/*` maps to `./src/*` for clean imports