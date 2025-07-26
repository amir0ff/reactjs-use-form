[![build and tests](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml/badge.svg)](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/amir0ff/reactjs-use-form)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/amir0ff/reactjs-use-form?label=repo%20size)](https://bundlephobia.com/package/reactjs-use-form)
[![npm minified bundle size](https://img.shields.io/bundlephobia/min/reactjs-use-form?label=minified)](https://bundlephobia.com/package/reactjs-use-form)
[![npm gzipped bundle size](https://img.shields.io/bundlephobia/minzip/reactjs-use-form?label=gzipped)](https://bundlephobia.com/package/reactjs-use-form)
[![typescript](https://img.shields.io/npm/types/reactjs-use-form?label=with)](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md)

This is a monorepo managed using [pnpm](https://pnpm.io) workspaces

```
root
  |  package.json
  |  pnpm-workspace.yaml
packages
  |
  ├─ main/
  |    package.json
  └─ examples/
       package.json
```

* Main module: [packages/main/](https://github.com/amir0ff/reactjs-use-form/tree/main/packages/main) 📦 Published to [npm](https://www.npmjs.com/package/reactjs-use-form).

* Examples app: [packages/examples/](https://github.com/amir0ff/reactjs-use-form/tree/main/packages/examples) 🚀 Deployed to [GitHub Pages](https://amir0ff.github.io/reactjs-use-form).

## Development

### Prerequisites
- Node.js 18+
- pnpm 9+ (recommended)

### Setup
```bash
# Clone the repository
git clone https://github.com/amir0ff/reactjs-use-form.git
cd reactjs-use-form

# Install dependencies
pnpm install

# Build library in watch mode
pnpm dev

# Run tests
pnpm test

# Start the example app
pnpm dev:example
```
