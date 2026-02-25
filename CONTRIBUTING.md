# Contributing Guidelines

## Commit Message Format

Follow the conventional commits specification:

```
<type>(<scope>): <subject>

<body>
```

### Types
- `feat`: New feature or solution
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```
feat(javascript): add closure examples

fix(polyfills): correct bind polyfill implementation

docs(react): update hooks documentation

refactor(machine-coding): improve autocomplete performance
```

## Branch Naming
- `feature/<feature-name>`
- `fix/<bug-name>`
- `docs/<update-name>`

## Code Style
- Run `npm run lint` before committing
- Run `npm run format` to auto-format code
- Follow naming conventions in each folder's README
