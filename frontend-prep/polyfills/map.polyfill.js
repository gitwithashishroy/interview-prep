/**
 * Polyfill: Array.prototype.map
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

Array.prototype.myMap = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.myMap called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const result = [];
  const arr = Object(this);
  const len = arr.length >>> 0;
  
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      result[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }
  
  return result;
};

// Test
const numbers = [1, 2, 3, 4];
const doubled = numbers.myMap(x => x * 2);
console.log(doubled); // [2, 4, 6, 8]

const words = ['hello', 'world'];
const lengths = words.myMap(word => word.length);
console.log(lengths); // [5, 5]
