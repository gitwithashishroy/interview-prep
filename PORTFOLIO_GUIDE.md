# 🎯 Portfolio Integration Guide

## Overview

Your DSA solutions repository is now configured to automatically generate statistics that you can use in your portfolio. Every time you push a new solution, GitHub Actions will:

1. Scan all your solution files
2. Extract metadata from the comments
3. Update the `stats.json` file
4. Commit it back to the repository

## 📊 What's Included

### Auto-Generated Files

- **stats.json** - Contains all statistics (total solved, difficulty breakdown, topics, languages, streak data)
- **README.md** - Updated with current stats and integration examples
- **GitHub Actions Workflow** - Runs automatically on every push

### Key Features

✅ **Automatic stats generation** on every push  
✅ **Streak tracking** (current and longest)  
✅ **Difficulty distribution** (Easy/Medium/Hard)  
✅ **Language statistics**  
✅ **Topic coverage**  
✅ **Portfolio-ready JSON format**  
✅ **Example integration code**

## 🚀 How to Use

### 1. Add Solutions

Create your solution files with the metadata format:

```typescript
/**
 * Problem: Two Sum
 * Difficulty: Easy
 * Topic: Array, Hash Table
 * Language: TypeScript
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Date: 2026-01-22
 * LeetCode: https://leetcode.com/problems/two-sum/
 */

// Your solution here
```

### 2. Push Your Code

```bash
git add .
git commit -m "Add: Two Sum solution"
git push
```

### 3. Automatic Stats Update

GitHub Actions will automatically:
- Generate updated stats
- Commit stats.json
- Make it available at: `https://raw.githubusercontent.com/gitwithashishroy/learning-dsa/main/stats.json`

## 📱 Portfolio Integration

### Option 1: Direct Fetch (JavaScript/TypeScript)

```javascript
const STATS_URL = 'https://raw.githubusercontent.com/gitwithashishroy/learning-dsa/main/stats.json';

async function getStats() {
  const response = await fetch(STATS_URL);
  const stats = await response.json();
  return stats;
}
```

### Option 2: React Component

```tsx
import { useEffect, useState } from 'react';

function DSAStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/gitwithashishroy/learning-dsa/main/stats.json')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading stats:', err);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="dsa-stats">
      <h2>DSA Journey</h2>
      <div className="stats-grid">
        <StatCard title="Total Solved" value={stats.totalSolved} />
        <StatCard title="Current Streak" value={`${stats.streak.current} days`} />
        <StatCard title="Easy" value={stats.byDifficulty.Easy} />
        <StatCard title="Medium" value={stats.byDifficulty.Medium} />
        <StatCard title="Hard" value={stats.byDifficulty.Hard} />
      </div>
    </div>
  );
}
```

### Option 3: Next.js (Server-Side)

```tsx
// app/page.tsx or pages/index.tsx
export async function getStaticProps() {
  const res = await fetch('https://raw.githubusercontent.com/gitwithashishroy/learning-dsa/main/stats.json');
  const stats = await res.json();
  
  return {
    props: { stats },
    revalidate: 3600 // Revalidate every hour
  };
}

export default function Home({ stats }) {
  return (
    <div>
      <h1>My DSA Journey</h1>
      <p>Total Problems Solved: {stats.totalSolved}</p>
      <p>Current Streak: {stats.streak.current} days 🔥</p>
    </div>
  );
}
```

### Option 4: HTML/CSS/JS (No Framework)

See the complete example in `/examples/portfolio-integration.html`

Open it in your browser to see a beautiful stats dashboard!

## 📊 Stats JSON Structure

```json
{
  "totalSolved": 1,
  "lastUpdated": "2026-01-22T02:25:08.362Z",
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
  "solutions": [
    {
      "filePath": "leetcode/hello-world.ts",
      "problem": "Hello World",
      "difficulty": "Easy",
      "topic": "Function",
      "language": "TypeScript",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "date": "2026-01-22",
      "leetcodeUrl": "https://leetcode.com/problems/create-hello-world/"
    }
  ],
  "streak": {
    "current": 1,
    "longest": 1
  }
}
```

## 🔧 Manual Stats Generation

You can also generate stats locally:

```bash
npm run generate-stats
```

## 📂 Supported File Extensions

The stats generator automatically scans files with these extensions:
- `.ts` - TypeScript
- `.js` - JavaScript
- `.py` - Python
- `.java` - Java
- `.cpp` - C++
- `.c` - C
- `.go` - Go
- `.rs` - Rust
- `.swift` - Swift
- `.kt` - Kotlin

## 🎨 Customization

### Add New Platforms

Create new folders like:
- `hackerrank/`
- `codeforces/`
- `codechef/`

The stats generator will automatically pick them up!

### Modify Stats Generation

Edit `scripts/generate-stats.ts` to:
- Add new metrics
- Change calculation logic
- Add custom formatting

### Update GitHub Actions

Edit `.github/workflows/generate-stats.yml` to:
- Change trigger conditions
- Modify commit messages
- Add additional steps

## 🌟 Best Practices

1. **Consistent Format**: Always include the metadata comment block
2. **Regular Commits**: Push frequently to keep stats updated
3. **Descriptive Names**: Use clear file names (e.g., `two-sum.ts`)
4. **Organization**: Keep solutions organized by platform/topic
5. **Cache in Portfolio**: Cache the stats in your portfolio for better performance

## 🔒 CORS Considerations

GitHub raw URLs support CORS, so you can fetch directly from the browser. However, for production:

1. **Consider caching**: Fetch and cache stats on your server
2. **Rate limiting**: GitHub has rate limits on raw file access
3. **CDN**: Use a CDN to cache the stats file

## 🐛 Troubleshooting

### Stats not updating?

1. Check GitHub Actions tab for workflow errors
2. Ensure you pushed to the `main` branch
3. Verify the metadata format in your files

### Workflow failing?

1. Check workflow permissions (Settings → Actions → General → Workflow permissions)
2. Ensure "Read and write permissions" is enabled

### Stats not showing in portfolio?

1. Verify the URL is correct
2. Check browser console for CORS errors
3. Ensure the stats.json file exists in your repo

## 📧 Support

If you encounter any issues, check:
1. GitHub Actions workflow logs
2. The generated stats.json file
3. Your solution file metadata format

---

**Happy Coding! 🚀**
