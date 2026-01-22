# 🚀 DSA Solutions Repository

[![Total Problems](https://img.shields.io/badge/Total%20Problems-1-blue)](./stats.json)
[![Last Updated](https://img.shields.io/badge/Last%20Updated-Dynamic-green)](./stats.json)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue)](./stats.json)

> A collection of Data Structures and Algorithms solutions from various platforms like LeetCode, HackerRank, and more.

## 📊 Statistics

This repository automatically tracks and updates statistics about solved problems. The stats are generated on every push using GitHub Actions.

### 🎯 Problem Breakdown

- **Total Solved**: 1
- **Easy**: 1
- **Medium**: 0
- **Hard**: 0

### 🔥 Streak Information

- **Current Streak**: 1 day
- **Longest Streak**: 1 day

### 💻 Languages Used

- **TypeScript**: 1 problem

### 📚 Topics Covered

- **Function**: 1 problem

## 📁 Repository Structure

```
dsa-solutions/
├── leetcode/          # LeetCode solutions
├── scripts/           # Stats generation scripts
├── .github/           # GitHub Actions workflows
├── stats.json         # Auto-generated stats (for portfolio)
└── README.md
```

## 🎨 Solution Format

Each solution includes structured metadata in comments:

```typescript
/**
 * Problem: [Problem Name]
 * Difficulty: [Easy/Medium/Hard]
 * Topic: [Data Structure/Algorithm]
 * Language: [Programming Language]
 * Time Complexity: O(...)
 * Space Complexity: O(...)
 * Date: YYYY-MM-DD
 * LeetCode: [Problem URL]
 */
```

## 🔄 Auto-Stats Generation

This repository uses GitHub Actions to automatically:
1. Scan all solution files
2. Extract metadata from comments
3. Generate comprehensive statistics
4. Update `stats.json` file
5. Commit changes back to the repository

The `stats.json` file can be consumed by your portfolio website to display live statistics!

## 📈 Using Stats in Your Portfolio

The `stats.json` file contains:

```json
{
  "totalSolved": 1,
  "lastUpdated": "2026-01-22T...",
  "byDifficulty": {
    "Easy": 1,
    "Medium": 0,
    "Hard": 0
  },
  "byLanguage": {
    "TypeScript": 1
  },
  "byTopic": {
    "Function": 1
  },
  "solutions": [...],
  "streak": {
    "current": 1,
    "longest": 1
  }
}
```

### Integration Examples

**JavaScript/TypeScript:**
```typescript
const response = await fetch('https://raw.githubusercontent.com/gitwithashishroy/learning-dsa/main/stats.json');
const stats = await response.json();
console.log(`Total Problems: ${stats.totalSolved}`);
```

**React Component:**
```tsx
import { useEffect, useState } from 'react';

function DSAStats() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/gitwithashishroy/learning-dsa/main/stats.json')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);
  
  return (
    <div>
      <h2>DSA Statistics</h2>
      <p>Total Solved: {stats?.totalSolved}</p>
      <p>Current Streak: {stats?.streak.current} days</p>
    </div>
  );
}
```

## 🚀 Getting Started

1. Add your solution files in the appropriate folders (leetcode/, hackerrank/, etc.)
2. Include the metadata comment block at the top of each file
3. Push your changes
4. GitHub Actions will automatically update the stats!

## 📝 License

This project is open source and available for learning purposes.

---

**Last Auto-Updated**: This README and stats.json are automatically updated on every push! 🎉
