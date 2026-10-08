<div align="center">

[![build and tests](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml/badge.svg)](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![bundle size](https://deno.bundlejs.com/badge?q=reactjs-use-form@1.7.6)](https://bundlejs.com/?q=reactjs-use-form@1.7.6)
[![typescript](https://img.shields.io/npm/types/reactjs-use-form?label=with)](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md)

[![Ask DeepWiki](https://img.shields.io/badge/Ask-DeepWiki-007acc?logo=bookstack&logoColor=white)](https://deepwiki.com/amir0ff/reactjs-use-form)
[![GitHub Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?logo=github)](https://github.com/sponsors/amir0ff)
[![Ko-fi](https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-ff5e5f?logo=ko-fi)](https://ko-fi.com/amir0ff)

</div>

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
- pnpm 9+ (via [Corepack](https://nodejs.org/api/corepack.html), already bundled with Node)

```bash
corepack enable
corepack prepare pnpm@9.0.0 --activate
```

### Setup
```bash
# Clone the repository
git clone https://github.com/amir0ff/reactjs-use-form.git
cd reactjs-use-form

# Install dependencies
pnpm install

# Build library in watch mode
pnpm dev

# Start the example app (separate terminal)
pnpm dev:example

# Run tests
pnpm test

# Lint
pnpm lint
```

## Support

If you find this project or any of my open-source work helpful, consider supporting future development:

- 💖 [Sponsor on GitHub](https://github.com/sponsors/amir0ff)
- ☕ [Buy me a coffee on Ko-fi](https://ko-fi.com/amir0ff)
