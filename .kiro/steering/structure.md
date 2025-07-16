# Project Structure

## Root Directory
```
├── src/                    # Main source code
├── public/                 # Static assets (favicons, manifests)
├── scripts/                # Build and utility scripts
├── .kiro/                  # Kiro AI assistant configuration
├── .vscode/                # VS Code settings
└── node_modules/           # Dependencies
```

## Source Directory (`src/`)
```
src/
├── components/             # Reusable React components
│   └── ui/                # Shadcn/ui components
├── documentations/         # MDX documentation files
│   └── 3.5.0/            # Version-specific docs
├── lib/                   # Utility functions and helpers
│   └── utils.ts           # Common utilities (cn, etc.)
├── routes/                # TanStack Router file-based routes
│   ├── __root.tsx         # Root layout component
│   ├── _main.tsx          # Main layout wrapper
│   ├── index.tsx          # Home page route
│   ├── _docs/             # Documentation routes
│   ├── _main/             # Main section routes
│   └── -root-components/  # Root-level components
├── main.tsx               # Application entry point
├── routeTree.gen.ts       # Auto-generated route tree
└── styles.css             # Global Tailwind styles
```

## Key Conventions

### Routing
- **File-based routing** with TanStack Router
- Route files use underscore prefixes for layouts (`_main.tsx`)
- Nested routes follow directory structure
- `routeTree.gen.ts` is auto-generated - never edit manually

### Components
- UI components in `src/components/ui/` (Shadcn/ui)
- Custom components in `src/components/`
- Use `@/` path alias for imports from `src/`

### Documentation
- MDX files in `src/documentations/`
- Organized by version directories
- Compiled to JSX via build script

### Styling
- Tailwind CSS classes preferred
- Global styles in `src/styles.css`
- Component-specific styles via Tailwind utilities
- Use `cn()` utility from `@/lib/utils` for conditional classes

### Scripts
- Build scripts in `scripts/` directory
- TypeScript configuration in `scripts.tsconfig.json`
- Compiled output in `scripts/dist/`