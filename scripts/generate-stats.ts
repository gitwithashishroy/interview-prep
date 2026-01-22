#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface Solution {
  problem: string;
  difficulty: string;
  topic: string;
  language: string;
  timeComplexity: string;
  spaceComplexity: string;
  date: string;
  leetcodeUrl: string;
  filePath: string;
}

interface Stats {
  totalSolved: number;
  lastUpdated: string;
  byDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
  byLanguage: Record<string, number>;
  byTopic: Record<string, number>;
  solutions: Solution[];
  streak: {
    current: number;
    longest: number;
  };
}

function extractMetadataFromFile(filePath: string): Solution | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    const metadata: any = {
      filePath: filePath.replace(process.cwd() + '/', ''),
    };

    // Extract metadata from comments
    for (const line of lines) {
      const problemMatch = line.match(/\*\s*Problem:\s*(.+)/);
      const difficultyMatch = line.match(/\*\s*Difficulty:\s*(.+)/);
      const topicMatch = line.match(/\*\s*Topic:\s*(.+)/);
      const languageMatch = line.match(/\*\s*Language:\s*(.+)/);
      const timeMatch = line.match(/\*\s*Time Complexity:\s*(.+)/);
      const spaceMatch = line.match(/\*\s*Space Complexity:\s*(.+)/);
      const dateMatch = line.match(/\*\s*Date:\s*(.+)/);
      const leetcodeMatch = line.match(/\*\s*LeetCode:\s*(.+)/);

      if (problemMatch) metadata.problem = problemMatch[1].trim();
      if (difficultyMatch) metadata.difficulty = difficultyMatch[1].trim();
      if (topicMatch) metadata.topic = topicMatch[1].trim();
      if (languageMatch) metadata.language = languageMatch[1].trim();
      if (timeMatch) metadata.timeComplexity = timeMatch[1].trim();
      if (spaceMatch) metadata.spaceComplexity = spaceMatch[1].trim();
      if (dateMatch) metadata.date = dateMatch[1].trim();
      if (leetcodeMatch) metadata.leetcodeUrl = leetcodeMatch[1].trim();
    }

    // Only return if we have at least problem and difficulty
    if (metadata.problem && metadata.difficulty) {
      return metadata as Solution;
    }

    return null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

function getAllSolutionFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .git, and scripts folders
      if (!['node_modules', '.git', 'scripts', '.github'].includes(file)) {
        getAllSolutionFiles(filePath, fileList);
      }
    } else {
      // Include common programming language extensions
      if (/\.(ts|js|py|java|cpp|c|go|rs|swift|kt)$/.test(file)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

function calculateStreak(solutions: Solution[]): { current: number; longest: number } {
  if (solutions.length === 0) return { current: 0, longest: 0 };

  // Sort solutions by date
  const sortedSolutions = [...solutions]
    .filter(s => s.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sortedSolutions.length === 0) return { current: 0, longest: 0 };

  const uniqueDates = [...new Set(sortedSolutions.map(s => s.date))];
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate current streak
  for (let i = 0; i < uniqueDates.length; i++) {
    const date = new Date(uniqueDates[i]);
    date.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (i === 0 && (diffDays === 0 || diffDays === 1)) {
      currentStreak = 1;
      for (let j = 1; j < uniqueDates.length; j++) {
        const prevDate = new Date(uniqueDates[j - 1]);
        const currDate = new Date(uniqueDates[j]);
        const dayDiff = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
        if (dayDiff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
    break;
  }

  // Calculate longest streak
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    const dayDiff = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }
  
  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return { current: currentStreak, longest: longestStreak };
}

function generateStats(): Stats {
  const rootDir = process.cwd();
  const solutionFiles = getAllSolutionFiles(rootDir);
  const solutions: Solution[] = [];

  console.log(`Found ${solutionFiles.length} solution files`);

  for (const file of solutionFiles) {
    const solution = extractMetadataFromFile(file);
    if (solution) {
      solutions.push(solution);
    }
  }

  const stats: Stats = {
    totalSolved: solutions.length,
    lastUpdated: new Date().toISOString(),
    byDifficulty: {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    },
    byLanguage: {},
    byTopic: {},
    solutions: solutions,
    streak: calculateStreak(solutions),
  };

  // Count by difficulty
  solutions.forEach((solution) => {
    const difficulty = solution.difficulty as 'Easy' | 'Medium' | 'Hard';
    if (stats.byDifficulty[difficulty] !== undefined) {
      stats.byDifficulty[difficulty]++;
    }

    // Count by language
    if (solution.language) {
      stats.byLanguage[solution.language] = (stats.byLanguage[solution.language] || 0) + 1;
    }

    // Count by topic
    if (solution.topic) {
      stats.byTopic[solution.topic] = (stats.byTopic[solution.topic] || 0) + 1;
    }
  });

  return stats;
}

function main() {
  console.log('Generating DSA stats...');
  
  const stats = generateStats();
  const outputPath = path.join(process.cwd(), 'stats.json');
  
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
  
  console.log(`✅ Stats generated successfully!`);
  console.log(`📊 Total problems solved: ${stats.totalSolved}`);
  console.log(`📈 Difficulty breakdown:`);
  console.log(`   - Easy: ${stats.byDifficulty.Easy}`);
  console.log(`   - Medium: ${stats.byDifficulty.Medium}`);
  console.log(`   - Hard: ${stats.byDifficulty.Hard}`);
  console.log(`🔥 Current streak: ${stats.streak.current} days`);
  console.log(`🏆 Longest streak: ${stats.streak.longest} days`);
  console.log(`📝 Stats saved to: ${outputPath}`);
}

main();
