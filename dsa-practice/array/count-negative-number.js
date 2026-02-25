function countNegatives(arr) {

  // implement your solution here
  if (arr === null || arr === undefined || !Array.isArray(arr)) {
    return false;
  }

  let count = 0; 
  for (let i = 0; i < arr.length; i++){
    if (typeof arr[i] !== 'number' || !Number.isFinite(arr[i])) {
      return false;
    }
    if (arr[i] < 0) {
      count++;
    }
  }

  return count;

}

const count = countNegatives([-2 , 3 , 9]);

console.log(count);
