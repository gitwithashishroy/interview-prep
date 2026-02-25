# 🚀 How to Run Your Solutions

This workspace is configured with multiple easy ways to run your DSA solutions!

## 📋 Methods to Run Solutions

### Method 1: Quick Run Script (Recommended)
Run any solution by just providing the filename:

```bash
npm run solve palindrom.ts
npm run solve binary-search.ts
npm run solve count-negative-number.js
```

The script automatically searches in:
- `leetcode/`
- `dsa-practice/`
- `dsa-practice/array/`
- `examples/`

### Method 2: VS Code Tasks (Keyboard Shortcuts)
1. Open any solution file
2. Press `Cmd+Shift+B` (Mac) or `Ctrl+Shift+B` (Windows/Linux)
3. Your file will run automatically in the terminal!

Or use the Command Palette (`Cmd+Shift+P`):
- Type "Run Task"
- Select "Run Current File"

### Method 3: VS Code Debugger (F5)
1. Open any solution file
2. Press `F5` to run with debugger
3. Set breakpoints to debug your code

### Method 4: Direct Terminal Commands

**TypeScript files:**
```bash
npm run dev leetcode/palindrom.ts
# or
ts-node leetcode/palindrom.ts
```

**JavaScript files:**
```bash
node dsa-practice/array/count-negative-number.js
```

## 🎯 Quick Examples

```bash
# Run a LeetCode solution
npm run solve anagram.ts

# Run a practice problem
npm run solve fibonacci.ts

# Run an array problem
npm run solve count-negative-number.js

# Run with full path
npm run solve dsa-practice/binary-search.ts
```

## 💡 Tips

- **Fastest way**: Open file → Press `Cmd+Shift+B`
- **For debugging**: Open file → Press `F5`
- **For custom runs**: Use `npm run solve <filename>`
- You don't need to specify the full path, just the filename!

## 🛠️ Configuration Files

- `.vscode/tasks.json` - VS Code task configurations
- `.vscode/launch.json` - Debugger configurations
- `scripts/run.ts` - Custom run script
- `package.json` - npm scripts

## 🔥 Keyboard Shortcuts

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Run Current File | `Cmd+Shift+B` | `Ctrl+Shift+B` |
| Debug Current File | `F5` | `F5` |
| Open Command Palette | `Cmd+Shift+P` | `Ctrl+Shift+P` |

Happy Coding! 🎉
