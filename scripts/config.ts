/**
 * Configuration file for DSA stats generation
 * Update these values with your personal LeetCode profile information
 */

export interface UserConfig {
  username?: string;
  ranking?: string; // e.g., "Top 5%"
  contestRating?: number; // e.g., 1650
  badges?: string[]; // e.g., ["Guardian", "Knight", "50 Days Badge"]
  submissionCalendar?: Array<{ date: string; count: number }>;
}

/**
 * User profile constants
 * Update these values manually as they don't change frequently
 */
export const USER_CONFIG: UserConfig = {
  // Optional: Add your LeetCode username
  username: "ashish_roy",
  
  // Optional: Add your ranking (e.g., "Top 5%", "Top 10%")
  ranking: '2265230',
  
  // Optional: Add your contest rating
  contestRating: 1412,
  
  // Optional: Add your earned badges
  badges: [],
  
  // Optional: Submission calendar data
  // You can manually update this or integrate with LeetCode API
  submissionCalendar: []
};
