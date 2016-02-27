const _ = require('lodash');

const getAdditionOperand = () => _.random(10, 65);
const getSubtractionOperand = () => _.random(10, 120);
const getMultiplicationOperand = () => _.random(2, 12);

const addition = () => {
    const left = getAdditionOperand();
    const right = getAdditionOperand();
    const result = left + right;

    return { left, right, result, operator: 'addition' };
};

const subtraction = () => {
    const operands = [getSubtractionOperand(), getSubtractionOperand()];
    const [right, left] = _.sortBy(operands);
    const result = left - right;

    return { left, right, result, operator: 'subtraction' };
};

const multiplication = () => {
    const left = getMultiplicationOperand();
    const right = getMultiplicationOperand();
    const result = left * right;

    return { left, right, result, operator: 'multiplication' };
};

const division = () => {
    const multiple = multiplication();
    return {
        left: multiple.result,
        right: multiple.right,
        result: multiple.left,
        operator: 'division'
    };
};

module.exports = {
    addition,
    subtraction,
    multiplication,
    division,
    getSum (operator) {
        if (_.isFunction(this[operator])) {
            return this[operator]();
        }
        throw new Error(`Unknown operator requested [${operator}]`);
    },
    getRandomSum () {
        const operator = _.sample(['addition', 'subtraction', 'multiplication', 'division']);
        return this.getSum(operator);
    }
};
