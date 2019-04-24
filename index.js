var readlineSync = require("readline-sync");
var isNumber = require('./is-number');

function assertValidOperation(value) {
  var operation = operations[value];
  if (typeof operation === "undefined") {
    throw Error("Unknown operation " + value);
  }
}

function assertMinLength(stack, n) {
  if (stack.length < n) {
    throw Error("Stack underflow");
  }
}

var operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => Math.floor(a / b),
  "%": (a, b) => a % b
};

class Calculator {
  constructor() {
    this.stack = [];
  }

  pop() {
    assertMinLength(this.stack, 1);
    return this.stack.pop();
  }

  push(value) {
    if (isNumber(value)) {
      value = parseInt(value);
      this.stack.push(value);
    } else {
      assertValidOperation(value);
      assertMinLength(this.stack, 2);
      this.evaluate(value);
    }
  }

  evaluate(operation) {
    operation = operations[operation];
    var left = this.pop();
    var right = this.pop();
    var result = operation(left, right);
    this.push(result);
  }

  show() {
    var s = "";
    for (var i = 0; i < this.stack.length; i++) {
      s += this.stack[i] + " ";
    }
    console.log(s);
  }
}

var calculator = new Calculator();

while (true) {
  var input = readlineSync.prompt();
  try {
    calculator.push(input);
  } catch (e) {
    var error = e.message;
    console.log(error);
  }
  calculator.show();
}
