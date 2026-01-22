//! Write a function createHelloWorld. It should return a new function that always returns "Hello World".


/**
 * Problem: Hello World
 * Difficulty: Easy
 * Topic: Function
 * Language: TypeScript
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * Date: 2026-01-22
 * LeetCode: https://leetcode.com/problems/create-hello-world/
 */


function createHelloWorld() {
    
    return function(...args: unknown[]): string {
        return "Hello World"
    };
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */