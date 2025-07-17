# Release Notes

## Version 1.6.7 (Latest)

## What's Changed
Documentation improvements and API completeness:
- Updated README.md to match comprehensive docs/definitions.md
- Included `isSubmitting`, `resetForm`, and `resetField` in documentation
- Updated `formSubmitCallback` type to show async support and value parameter
- Enhanced property descriptions for better clarity and accuracy
- Added missing properties to destructuring examples
- README now documents all 10 available useForm properties/functions

**Full Changelog**: https://github.com/amir0ff/reactjs-use-form/compare/1.6.6...1.6.7

---

## Version 1.6.6

## What's Changed

Security and deployment fixes:

- Update vitest to v3.2.4 to fix esbuild vulnerability (GHSA-67mh-4wv8-2f99)
- Update workflow to use correct build output directory (`build/` instead of `dist/`)
- All 19 tests continue to pass with updated vitest
- Updated build tools for better security and performance
- Complete resolution of all known security issues

**Full Changelog**: https://github.com/amir0ff/reactjs-use-form/compare/1.6.5...1.6.6

---

## Version 1.6.5

## What's Changed

Test infrastructure fixes and compatibility improvements:

- Fix React/React DOM version mismatch causing test failures
- Add explicit react-dom@^18.3.1 dev dependency to match React 18.3.1
- Resolve TypeError in tests caused by @testing-library/react v16.1.0 pulling in React DOM v19.1.0
- All 19 tests now passing successfully after dependency updates
- Improve test stability and compatibility with updated build tools

**Full Changelog**: https://github.com/amir0ff/reactjs-use-form/compare/1.6.4...1.6.5

---

## Version 1.6.4

## What's Changed

Build configuration fixes and styling restoration:

- Fix PostCSS configuration compatibility with Tailwind CSS v3.4.17
- Remove incompatible @tailwindcss/postcss v4.1.11 package (was for Tailwind v4)
- Revert to standard PostCSS plugin configuration for Tailwind CSS v3
- Change Vite output directory from 'dist' to 'build' for consistency
- Update clean script to match new output directory
- Restore proper styling functionality in example app
- Build now works correctly with proper CSS generation

**Full Changelog**: https://github.com/amir0ff/reactjs-use-form/compare/1.6.3...1.6.4

---

## Version 1.6.3

## What's Changed

Security fix and dependency updates:

- Fix moderate severity esbuild vulnerability (GHSA-67mh-4wv8-2f99)
- Update Vite, Vitest, and @vitejs/plugin-react to latest versions
- Resolve all known security vulnerabilities in dependency chain
- Maintain full test compatibility after dependency updates
- Improve development tooling with latest build tools

**Full Changelog**: https://github.com/amir0ff/reactjs-use-form/compare/1.6.2...1.6.3

---

## Version 1.6.2

## What's Changed

Documentation fix and npm package alignment:

- Fix README.md removing outdated feature references
- Align documentation with actual library capabilities after 1.6.0/1.6.1 changes
- Ensure npm package page shows accurate documentation
- No functional code changes - documentation update only

**Full Changelog**: https://github.com/amir0ff/reactjs-use-form/compare/1.6.1...1.6.2

---

## Version 1.6.1

## What's Changed

Performance refactoring and UI migration release:

- Refactor form library with memoized initial states and computed optimizations
- Replace Material-UI components with shadcn/ui throughout examples
- Add light/dark theme toggle with modern ThemeProvider
- Implement efficient validation that only processes dirty fields
- Enhance form state indicators with visual status display
- Improve TypeScript strict mode compatibility and type safety
- Add intelligent reset functionality with smart disable states
- Separate utility functions for better maintainability
- Update documentation structure with dedicated release notes

**Full Changelog**: https://github.com/amir0ff/reactjs-use-form/compare/1.6.0...1.6.1
