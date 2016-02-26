const _ = require('lodash');

const getAdditionOperand = () => _.random(10, 65);
const getSubtractionOperand = () => _.random(10, 120);
const getMultiplicationOperand = () => _.random(2, 12);

const addition = () => {
    const left = getAdditionOperand();
    const right = getAdditionOperand();
    const result = left + right;

    return { left, right, result, operator: 'add' };
};

const subtraction = () => {
    const operands = [getSubtractionOperand(), getSubtractionOperand()];
    const [right, left] = _.sortBy(operands);
    const result = left - right;

    return { left, right, result, operator: 'subtract' };
};

const multiplication = () => {
    const left = getMultiplicationOperand();
    const right = getMultiplicationOperand();
    const result = left * right;

    return { left, right, result, operator: 'multiply' };
};

const division = () => {
    const multiple = multiplication();
    return {
        left: multiple.result,
        right: multiple.right,
        result: multiple.left,
        operator: 'divide'
    };
};

module.exports = {
    addition,
    subtraction,
    multiplication,
    division
};
