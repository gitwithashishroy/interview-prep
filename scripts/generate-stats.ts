#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { USER_CONFIG } from './config';

export interface Solution {
  filePath: string;
  problem: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string | string[];
  language: string;
  timeComplexity: string;
  spaceComplexity: string;
  date: string;
  leetcodeUrl: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  lastUpdated: string;
  byDifficulty: Record<string, number>;
  byLanguage: Record<string, number>;
  byTopic: Record<string, number>;
  solutions: Solution[];
  streak: {
    current: number;
    longest: number;
  };
  // Optional fields - from config
  username?: string;
  ranking?: string;
  contestRating?: number;
  badges?: string[];
  submissionCalendar?: Array<{ date: string; count: number }>;
}

function extractMetadataFromFile(filePath: string): Solution | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    const metadata: any = {
      filePath: filePath.replace(process.cwd() + '/', ''),
    };

    // Extract topic from folder structure
    const relativePath = filePath.replace(process.cwd() + '/', '');
    const pathParts = relativePath.split(path.sep);
    const folderTopics: string[] = [];
    
    // Skip root folders like 'leetcode', 'dsa-practice', etc.
    // Extract intermediate folder names as topics
    const skipFolders = ['leetcode', 'dsa-practice', 'examples', 'scripts', 'node_modules'];
    for (let i = 0; i < pathParts.length - 1; i++) {
      const folder = pathParts[i];
      if (!skipFolders.includes(folder)) {
        // Capitalize first letter and convert hyphens/underscores to spaces
        const topicName = folder
          .replace(/[-_]/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        folderTopics.push(topicName);
      }
    }

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
      if (topicMatch) {
        const topicStr = topicMatch[1].trim();
        // Support both single topic and comma-separated topics
        const metadataTopics = topicStr.includes(',') 
          ? topicStr.split(',').map(t => t.trim())
          : [topicStr];
        
        // Merge folder topics with metadata topics (avoid duplicates)
        const allTopics = [...folderTopics];
        metadataTopics.forEach(topic => {
          if (!allTopics.includes(topic)) {
            allTopics.push(topic);
          }
        });
        
        metadata.topic = allTopics.length === 1 ? allTopics[0] : allTopics;
      } else if (folderTopics.length > 0) {
        // If no topic in metadata, use folder topics
        metadata.topic = folderTopics.length === 1 ? folderTopics[0] : folderTopics;
      }
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

function generateSubmissionCalendar(solutions: Solution[]): Array<{ date: string; count: number }> {
  const dateCountMap: Record<string, number> = {};

  // Count solutions per date
  solutions.forEach(solution => {
    if (solution.date) {
      const date = solution.date.split('T')[0]; // Get just the date part (YYYY-MM-DD)
      dateCountMap[date] = (dateCountMap[date] || 0) + 1;
    }
  });

  // Convert to array and sort by date
  return Object.entries(dateCountMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function generateStats(): LeetCodeStats {
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

  const stats: LeetCodeStats = {
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
    // Include user config data
    ...USER_CONFIG,
    // Generate submission calendar from solution dates
    submissionCalendar: generateSubmissionCalendar(solutions),
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

    // Count by topic (handle both string and array)
    if (solution.topic) {
      const topics = Array.isArray(solution.topic) ? solution.topic : [solution.topic];
      topics.forEach(topic => {
        stats.byTopic[topic] = (stats.byTopic[topic] || 0) + 1;
      });
    }
  });

  return stats;
}

function main() { 
  const stats = generateStats();
  console.log(stats);
  const outputPath = path.join(process.cwd(), 'stats.json');
  
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));

  //! not needed logs
  // console.log(`✅ Stats generated successfully!`);
  // console.log(`📊 Total problems solved: ${stats.totalSolved}`);
  // console.log(`📈 Difficulty breakdown:`);
  // console.log(`   - Easy: ${stats.byDifficulty.Easy}`);
  // console.log(`   - Medium: ${stats.byDifficulty.Medium}`);
  // console.log(`   - Hard: ${stats.byDifficulty.Hard}`);
  // console.log(`🔥 Current streak: ${stats.streak.current} days`);
  // console.log(`🏆 Longest streak: ${stats.streak.longest} days`);
  // console.log(`📝 Stats saved to: ${outputPath}`);
}

main();
