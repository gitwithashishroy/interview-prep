# 🚀 Interview Preparation Repository

> Comprehensive guide for SDE-2: DSA, Frontend, React, System Design

## 📁 Folder Structure

```
frontend-prep/
├── javascript/          # Core JavaScript concepts
├── react/              # React patterns and hooks
├── polyfills/          # Native method implementations
├── machine-coding/     # UI component challenges
├── css/                # CSS layouts and animations
└── system-design/      # Frontend architecture
```

## 📝 File Naming Convention

| Category | Convention | Example |
|----------|-----------|---------|
| JavaScript | `topic-name.js` | `closure.js` |
| React | `ComponentName.tsx` | `Counter.tsx` |
| Hooks | `use-hook-name.ts` | `use-fetch.ts` |
| Polyfills | `method.polyfill.js` | `map.polyfill.js` |
| Machine Coding | `problem-name/` | `infinite-scroll/` |
| System Design | `system-name.md` | `youtube-clone.md` |

## 🏃 Quick Start

### Run Solutions
```bash
# JavaScript/React/Polyfills
npm run solve closure.js
npm run solve Counter.tsx

# Or use keyboard shortcut
# Open file → Cmd+Shift+B (Mac) / Ctrl+Shift+B (Windows)
```

### Setup Linting (Optional)
```bash
npm install -D eslint prettier eslint-config-prettier
npm run lint
npm run format
```

## 📚 Topics Coverage

### JavaScript
- Closures, Promises, Event Loop
- Prototypes, Hoisting, Scope
- Currying, Memoization
- Debounce, Throttle

### React
- Hooks (useState, useEffect, useCallback, useMemo)
- Custom Hooks, Context API
- Performance Optimization
- Component Patterns

### Polyfills
- Array methods (map, filter, reduce)
- Promise.all, Promise.race
- Function methods (call, apply, bind)
- Object methods

### Machine Coding
- Autocomplete, Infinite Scroll
- Star Rating, Pagination
- Modal, Tabs, Accordion
- Todo App, Shopping Cart

### System Design
- Component Architecture
- State Management (Redux, Context)
- Performance & Optimization
- API Design, Caching

## 🛠️ Scripts

```json
{
  "solve": "Run any solution file",
  "lint": "Check code quality",
  "format": "Auto-format code",
  "stats": "Generate progress stats"
}
```

## 📋 Commit Format

```
<type>(<scope>): <subject>

Examples:
feat(javascript): add closure examples
fix(polyfills): correct bind implementation
docs(react): update hooks guide
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

## 🎯 Best Practices

1. **One concept per file** - Keep solutions focused
2. **Add comments** - Explain time/space complexity
3. **Include examples** - Add test cases
4. **Follow naming** - Use consistent conventions
5. **Write tests** - Validate your solutions

## 📖 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [React Documentation](https://react.dev/)
- [JavaScript Info](https://javascript.info/)
- [Frontend Interview Handbook](https://www.frontendinterviewhandbook.com/)

## 📧 Author

**Ashish Roy**
- GitHub: [@gitwithashishroy](https://github.com/gitwithashishroy)

## 📄 License

MIT

---

**Ready to practice?** → `npm run solve <filename>`
