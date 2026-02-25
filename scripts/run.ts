#!/usr/bin/env ts-node
/**
 * Run script for executing DSA solutions
 * Usage: npm run solve <filename>
 * Example: npm run solve palindrom.ts
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

const execAsync = promisify(exec);

// Directories to search for solution files
const SEARCH_DIRS = [
  'leetcode',
  'dsa-practice',
  'dsa-practice/array',
  'dsa-practice/javascript',
  'frontend-prep/javascript',
  'frontend-prep/react',
  'frontend-prep/polyfills',
  'frontend-prep/machine-coding',
  'frontend-prep/css',
  'examples'
];

/**
 * Find a file in the workspace
 */
function findFile(filename: string): string | null {
  // Check if it's an absolute path
  if (path.isAbsolute(filename) && fs.existsSync(filename)) {
    return filename;
  }

  // Check if it's a relative path from current directory
  if (fs.existsSync(filename)) {
    return path.resolve(filename);
  }

  // Search in predefined directories
  for (const dir of SEARCH_DIRS) {
    const fullPath = path.join(process.cwd(), dir, filename);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

/**
 * Execute a solution file
 */
async function runSolution(filePath: string): Promise<void> {
  const ext = path.extname(filePath);
  let command: string;

  switch (ext) {
    case '.ts':
      command = `ts-node "${filePath}"`;
      break;
    case '.js':
      command = `node "${filePath}"`;
      break;
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }

  console.log(`\n🚀 Running: ${path.basename(filePath)}`);
  console.log(`📁 Path: ${filePath}`);
  console.log(`⚡ Command: ${command}\n`);
  console.log('─'.repeat(50));

  try {
    const { stdout, stderr } = await execAsync(command);
    
    if (stdout) {
      console.log(stdout);
    }
    
    if (stderr) {
      console.error('⚠️  Warnings/Errors:');
      console.error(stderr);
    }
    
    console.log('─'.repeat(50));
    console.log('✅ Execution completed successfully!\n');
  } catch (error: any) {
    console.log('─'.repeat(50));
    console.error('❌ Execution failed!');
    console.error(error.message);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    process.exit(1);
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ Error: Please provide a filename');
    console.log('\nUsage:');
    console.log('  npm run solve <filename>');
    console.log('\nExamples:');
    console.log('  npm run solve palindrom.ts');
    console.log('  npm run solve binary-search.ts');
    console.log('  npm run solve count-negative-number.js');
    console.log('\nThe script will search in these directories:');
    SEARCH_DIRS.forEach(dir => console.log(`  - ${dir}`));
    process.exit(1);
  }

  const filename = args[0];
  const filePath = findFile(filename);

  if (!filePath) {
    console.error(`❌ Error: File "${filename}" not found`);
    console.log('\nSearched in:');
    SEARCH_DIRS.forEach(dir => console.log(`  - ${dir}`));
    process.exit(1);
  }

  await runSolution(filePath);
}

main();
