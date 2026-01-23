//! Palindrome Problem

/**
 * Problem: Palindrome Check
 * Difficulty: Easy
 * Topic: Function
 * Language: TypeScript
 * Time Complexity: O(log10(n))
 * Space Complexity: O(1)
 * Date: 2026-01-23
 * LeetCode: https://leetcode.com/problems/palindrome-number/
 */



function isPalindrome(x: number): boolean {
    let rev : number = 0 ;
    if(x < 0 || (x % 10 === 0 && x !== 0)){
        return false ;
    }else {
       while(x > rev){
        const rem =  x % 10 ;
         rev  = rev * 10 + rem ;
         x = Math.floor(x / 10);
       }
    }
    
    return rev === x || x === Math.floor(rev/10) ;
};