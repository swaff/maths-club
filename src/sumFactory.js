const _ = require('lodash');

const getNumberGenerator = (operator, numberGenerators) => numberGenerators[operator];
const getFirstOperand = (numberGenerator) => numberGenerator.first();
const getSecondOperand = (numberGenerator, firstOperand) => numberGenerator.second(firstOperand);

const results = {
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    add: _.add,
    subtract: _.subtract
};

const getResult = (operator) => results[operator];

const factory = function (operator, numberGenerators) {

    const numberGenerator = getNumberGenerator(operator, numberGenerators);
    const firstOperand = getFirstOperand(numberGenerator);
    const secondOperand = getSecondOperand(numberGenerator, firstOperand);

    return {
        firstOperand,
        secondOperand,
        result: getResult(operator)(firstOperand, secondOperand)
    };
};

module.exports = factory;
