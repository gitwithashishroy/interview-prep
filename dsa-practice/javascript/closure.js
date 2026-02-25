//! Closure Example

const createCounter = ()=> {
  let count = 0 ;

  return {
    increment : () => ++count,
    get : ()=> count
  }
}

const counter = createCounter();

console.log(counter);
console.log(counter.increment());
console.log(counter.get());


//! Function Call , Apply and Bind

const name = {
    firstName : 'Ashish Kumar' , 
    lastName : 'Roy'
}

function printUserDetails(state){
    console.log(`${this.firstName} ${this.lastName} from ${state}`)
}


const name1 = {
    firstName : 'Ashish',
    lastName : 'Roy'
}

printUserDetails.call(name , 'bihar');
printUserDetails.apply(name1 , ['bihar']);

let printDetails = printUserDetails.bind(name1 , 'bihar');
console.log(printDetails());
