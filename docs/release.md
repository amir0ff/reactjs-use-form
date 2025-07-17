# Release Notes

## Version 1.6.9 (Latest)

## What's Changed

Performance optimization and efficiency improvements:

- **Optimized validation effect**: Implemented shallow comparison to prevent unnecessary re-renders when values haven't actually changed
- **Enhanced error object comparison**: Added specialized equality check for error objects to avoid unnecessary state updates
- **Improved state batching**: Optimized state updates with early returns and conditional updates to minimize re-renders
- **Memory optimization**: Replaced `Object.keys().reduce()` with `for...in` loops for better performance in utility functions
- **Validation efficiency**: Optimized validation to only create new objects when changes are detected
- **Reference tracking**: Added `useRef` to track previous values for intelligent change detection
- **Reduced object creation**: Minimized object spread operations and unnecessary allocations
- **Loop optimization**: Replaced `Array.some()` and `Array.filter()` with `for...in` loops for better performance

Technical improvements:
- Added `shallowEqual` utility for efficient object comparison
- Added `errorObjectsEqual` utility for specialized error object comparison
- Enhanced `handleOnChange` with early returns and conditional dirty state updates
- Optimized computed values (`isDirty`, `hasFormErrors`, `hasEmptyRequiredFields`) to use loops instead of array methods
- Improved validation effect to only run when actual changes are detected

**Full Changelog**: https://github.com/amir0ff/reactjs-use-form/compare/1.6.8...1.6.9

---

## Version 1.6.8

## What's Changed

Documentation consolidation and cleanup:

- Removed duplicate commands: Eliminated `cleanup` in favor of `clean` command
- Removed duplicate scripts: Eliminated `start:example` in favor of `dev:example`
- Consolidated setup documentation: Proper separation between user and contributor docs
- Streamlined README structure: Root README for contributors, main README for end users
- Clean command improvements: Uses pnpm filtering for better maintainability
- Enhanced setup instructions: Clear, step-by-step development setup
- Improved consistency: All commands properly referenced and working

**Full Changelog**: https://github.com/amir0ff/reactjs-use-form/compare/1.6.7...1.6.8

---

## Version 1.6.7

## What's Changed

Documentation improvements and API completeness:

- README synchronization: Updated README.md to match comprehensive docs/definitions.md
- Added missing properties: Included `isSubmitting`, `resetForm`, and `resetField` in documentation
- Fixed type definitions: Updated `formSubmitCallback` type to show async support and value parameter
- Improved descriptions: Enhanced property descriptions for better clarity and accuracy
- Updated code examples: Added missing properties to destructuring examples
- Complete API coverage: README now documents all 10 available useForm properties/functions

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
