# Release Notes

## Version 1.6.2 (Latest)

### What's New
- **Documentation fix**: Restored correct README.md removing outdated feature references
- **npm package alignment**: Ensures npm package page shows accurate documentation

### Technical Details
- Fixed README that incorrectly referenced removed async validation and dynamic fields
- Aligned documentation with actual library capabilities after 1.6.0/1.6.1 changes
- No functional code changes - documentation update only

---

## Version 1.6.1

### What's New

- **Performance refactoring**: Memoized states, computed optimizations, efficient validation
- **UI migration**: Replaced Material-UI with shadcn/ui components + light/dark theme toggle
- **Enhanced form state indicators**: Visual display of all form states (isDirty, isDisabled, isSubmitting, isSubmitted)
- **Improved reset functionality**: Better UX with smart disable states and visual feedback
- **Better TypeScript support**: Improved strict mode compatibility and type safety

### Technical Improvements

- Separated utility functions for better maintainability
- Extracted constants for memory efficiency
- Cleaner event handler implementations
- Enhanced documentation organization

---

## Version 1.6.0+ Performance Improvements

This version includes significant performance and code quality improvements:

### 🚀 Performance Enhancements

- **Memoized initial states**: Uses `useMemo` to prevent unnecessary recalculations on every render
- **Computed state optimization**: `isDirty`, `isDisabled`, and `isFormInvalid` are now computed with `useMemo`
- **Efficient validation**: Only validates fields that have actually changed
- **Change detection**: Prevents unnecessary state updates when errors haven't changed

### 🔧 Code Quality Improvements

- **Better TypeScript support**: Improved strict mode compatibility with proper type assertions
- **Cleaner architecture**: Separated utility functions for better maintainability and testing
- **Reduced complexity**: Simplified event handler implementations
- **Constants extraction**: Moved reusable error objects to constants for better memory usage

### 🎯 Maintained Functionality

All existing functionality remains exactly the same - this is a pure refactoring focused on performance and maintainability.

---

## Migration Guide

No migration is required for version 1.6.0+. This is a pure performance and code quality improvement that maintains full backward compatibility.

### What Changed

- Internal implementation optimizations
- Better TypeScript strict mode support
- Improved event handler type safety (`HandleOnChangeType` now specifically typed for `HTMLInputElement`)

### What Stayed the Same

- All public API remains identical
- All existing functionality preserved
- No breaking changes to form behavior or state management
