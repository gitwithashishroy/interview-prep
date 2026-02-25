/**
 * Polyfill: Function.prototype.bind
 * Time Complexity: O(1)
 * Space Complexity: O(n) - stores arguments
 */

Function.prototype.myBind = function(context, ...boundArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }
  
  const fn = this;
  
  return function(...args) {
    return fn.apply(context, [...boundArgs, ...args]);
  };
};

// Test
const person = {
  name: 'John',
  greet(greeting, punctuation) {
    return `${greeting}, I'm ${this.name}${punctuation}`;
  }
};

const greetJohn = person.greet.myBind(person, 'Hello');
console.log(greetJohn('!'));  // Hello, I'm John!
console.log(greetJohn('?'));  // Hello, I'm John?

const anotherPerson = { name: 'Jane' };
const greetJane = person.greet.myBind(anotherPerson);
console.log(greetJane('Hi', '!')); // Hi, I'm Jane!
