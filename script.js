const FIB_MAX = 35;


const fibForm = document.getElementById('fib-form');
const fibInput = document.getElementById('fib-input');
const fibOutput = document.getElementById('fib-output');

fibForm.onsubmit = function(e) {
  e.preventDefault();
  const fibValue = fibInput.value;
  try{
    
    fibOutput.innerHTML = run(fibValue).join('<br/>');
  }catch(err){
    fibOutput.innerHTML = err.message;
  }
};

function fibonacciLastNumber(n, currentString = "") {
 
  if (n < 2) {
    return 1;
  } else {

    return fibonacciLastNumber(n - 2) + fibonacciLastNumber(n - 1);
  }
}

function fibonacciRecursive(n, numbers = []) {
  const len = numbers.length;
 
  if (len < 2) {
    numbers.push(1);
    return fibonacciRecursive(n, numbers);
  } else if (len < n){
    const n_2 = numbers[len - 2];
    const n_1 = numbers[len -1];
    
    numbers.push(n_2 + n_1);
    

    return fibonacciRecursive(n, numbers);
  }
  
  return numbers;
}


function timer(functionToTime, ...args){
  const t0 = performance.now();
  const funcResult = functionToTime(...args);
  const t1 = performance.now();
  const finalTime = t1 - t0;
  return [funcResult, finalTime];
}

function formatResults(title, time, value){
  return `${title} (${time.toFixed(4)}ms): ${value}`;
}

function run(n) {
  
  let i = 0;
  const results = [];


  error = errorCheck(n);


  if (error.success === false) {
    throw new Error(error.msg);
  }
    const [recursiveResult, recursiveTime] = timer(fibonacciLastNumber, n - 1);
  const [recursiveWithLookup, recursiveWithLookupTime] = timer(fibonacciRecursive, n);

  const formattedResults = [
    formatResults(`Only fetch last number:`, recursiveTime, recursiveResult),
    formatResults(`Recursion with lookup`, recursiveWithLookupTime, recursiveWithLookup.join(', '))
  ];
  

  results.push(...formattedResults);
  

  if(recursiveTime === 0){
    results.push(`<br/><h3>The functions ran really fast! Maybe try a bigger number like 25 or 30</h3>`);
  }
  return results;
}
function errorCheck(n) {
  

  var error = {'msg': '', 'success': true};
  if (FIB_MAX === undefined) {
    FIB_MAX = 30;
  }

  if (n === '') {
    error.msg = "The input was blank. " +
      "If you're not sure what to put, try 15.";
  }

  if (parseInt(n) > FIB_MAX) {
    error.msg = "We are using recursion... " +
      "generating " + n + " " +
      "fibonacci numbers recursively is " +
      "not such a great idea. Stick to numbers " +
      "less than or equal to " + FIB_MAX;
  }
 
  if (isNaN(n)) {
    error.msg = "Really... you want to find " +
      "the <b>" + n + "</b><sup>th</sup> fibonacci number? " +
      "Let's try that again.";
  }
  
  // if there is a message, 
  // change to failed status 
  if(error.msg !== ''){
    error.success = false;
  } 
  return error;
}