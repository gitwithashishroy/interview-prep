## Setup Instructions

### 1. Install ESLint & Prettier

```bash
npm install -D eslint prettier eslint-config-prettier
```

### 2. Install ESLint TypeScript Support (Optional)

```bash
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Update `.eslintrc.json`:
```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

### 3. VSCode Settings (Optional)

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 4. Run Commands

```bash
# Check linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix

# Format code
npm run format
```

### 5. Pre-commit Hook (Optional)

Install Husky:
```bash
npm install -D husky lint-staged
npx husky init
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```
