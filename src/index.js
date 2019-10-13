function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let polishArray = new Array();
	let operators = "+-*/";
    let braces = "()";
    let stack = new Array();
    let number = "";

    for(i = 0; i < expr.length; i++){
            
        let ch = expr.charAt(i);
        
        if((!isNaN(ch))&&(ch != ' ')){    
            number += ch;
        }else if(operators.indexOf(ch) != -1){
            if (number != "") {
                polishArray.push(number);
                number = "";
            }
            if (stack.length != 0) {
                let firstOut = stack[stack.length-1];	

                if(operators.indexOf(firstOut) != -1){
                    if(((ch == '+')||(ch == '-'))
                            ||(((ch == '*')||(ch == '/'))&&((firstOut == '*')||(firstOut == '/')))){
                        polishArray.push(stack.pop());
                        i--;
                        continue;
                    }						
                }								
            }	
            stack.push(ch);		
        }else if(braces.indexOf(ch) != -1){
            if (number != "") {
                polishArray.push(number);
                number = "";
            }
            if(ch == '('){
                stack.push(ch);		
            } else {
                firstOut = stack.pop();
                while (firstOut != '(') {
                    if (firstOut != ' ') {
                        polishArray.push(firstOut);
                    }
                    firstOut = stack.pop();
                    if (firstOut == undefined) {
                        throw "ExpressionError: Brackets must be paired";
                    }
                }
            }
        }          
    }

    if (number != "") {
        polishArray.push(number);
        number = "";
    }

    for (i=stack.length-1; i>=0; i--) {
        if(operators.indexOf(stack[i]) == -1){
            throw "ExpressionError: Brackets must be paired";
        }
        polishArray.push(stack[i])
    }

    //calculate
    stack = new Array();
    result = 0;
    let currentCh;
    let ch1;
    let ch2;
    let n1;
    let n2;
    let r;

    for (i = 0; i < polishArray.length; i++) {

        currentCh = polishArray[i];

        if (!isNaN(currentCh)) {
            let n = parseFloat(currentCh);
            stack.push(n);
        } else {

            n1 = stack.pop();
            n2 = stack.pop();
            r = 0;

            if (currentCh == '+') {
                r = n1 + n2;
            } else if (currentCh == '-') {
                r = n2 - n1;
            } else if (currentCh == '*') {
                r = n1 * n2;
            } else if (currentCh == '/') {
                if (n1 == 0) {
                    throw "TypeError: Division by zero.";
                } else {
                    r = n2 / n1;
                }
            }
            stack.push(r);
        }
    }

    return stack.pop();
}

module.exports = {
    expressionCalculator
}