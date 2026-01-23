//! let x = 3456 , find the number of digits in x using loop

function countDigits(x: number): number {
    let count = 0;
    let number = Math.abs(x); // Handle negative numbers

    if (number === 0) {
        return 1; // Zero has one digit
    }

    while (number > 0) {
        number = Math.floor(number / 10);
        count++;
    }

    return count;
}

// Example usage:
const x = 3456;
console.log(`The number of digits in ${x} is: ${countDigits(x)}`); 
