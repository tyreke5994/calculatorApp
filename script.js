
var operands = []

var operators = []

var currentOperand = "";

var currentValue, equalButtonPressed;

var app = {
    calculate: function() {
    var j = 0;
    currentValue = operands[0];

   for(var i = 1; i < operands.length; i++) {
       var currentOperation = operators[j];

       if(currentOperation === "+") {
          currentValue = Number(currentValue) + Number(operands[i]);
       } else if (currentOperation === "-") {
          currentValue = Number(currentValue) - Number(operands[i]);
       } else if (currentOperation === "÷") {
           currentValue = Number(currentValue)/Number(operands[i]);
       } else { 
           currentValue = currentValue * operands[i];
       }
       
       j++;
   }
   document.getElementById("current-operand").innerHTML = currentValue;
   document.getElementById("previous-operand").innerHTML = "";
   operands = [];
   operators = [];
   currentOperand = currentValue;

},

 appendNumber: function(number) {
    currentOperand = currentOperand + number;
    this.updateDisplay();
 },

 pushOperator: function(operator) {  //push operator to the array of operators
     operators.push(operator);
 },

 pushOperand: function() { //push operand to the array of operands
     operands.push(currentOperand);
     if(!equalButtonPressed) {
     currentOperand = "";
     }
 },
 delete: function(operand) {
    currentOperand = operand.slice(0, -1);
 },
 allClear: function() {
        operands = [];
        operators = [];
        currentOperand = "";
 },
 updateDisplay: function() { //passes in array of operands and operators
     var currentOperandDiv = document.getElementById("current-operand");
     var previousOperandDiv = document.getElementById("previous-operand");
     var previousOperandString = "";

     currentOperandDiv.innerHTML = currentOperand;
    
     if(operands) {            //combines previous operands and operators into string, then updates previousOprandDiv
     for(var i = 0; i < operands.length; i++) {
         previousOperandString = previousOperandString + operands[i] + operators[i];
     }
     previousOperandDiv.innerHTML = previousOperandString;
 } 
}
  
}


var calculator = document.getElementById("calculator");
calculator.addEventListener('click', function(e) {
    var elementClicked = e.target;
    if(elementClicked.className === "number-button") {
        app.appendNumber(elementClicked.innerText);
    } else if(elementClicked.className === "operator-button") {
        equalButtonPressed = false;
        app.pushOperand(currentOperand);
        app.pushOperator(elementClicked.innerText);
        app.updateDisplay();
    } else if(elementClicked.className === "delete-button") {
        app.delete(currentOperand);
        app.updateDisplay();
    } else if(elementClicked.innerText === "AC") {
        app.allClear();
        app.updateDisplay();
    } else if(elementClicked.innerText === "=") {
        equalButtonPressed = true;
        app.pushOperand();
        app.calculate();
    }

});