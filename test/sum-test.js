const test = require('tape');
const _ = require('lodash');
const sumFactory = require('../src/sumFactory');

const numberGenerators = {
    add: {
        first: () => 10,
        second: () => 5,
    },
    subtract: {
        first: () => 10,
        second: () => 5,
    },
    multiply: {
        first: () => 10,
        second: () => 5,
    },
    divide: {
        first: () => 10,
        second: () => 5,
    },
};

const additionSum = sumFactory('add', numberGenerators);
const subtractionSum = sumFactory('subtract', numberGenerators);
const multiplicationSum = sumFactory('multiply', numberGenerators);
const divisionSum = sumFactory('divide', numberGenerators);

test('creates an addition sum', function (t) {
    t.equal(additionSum.firstOperand, 10);
    t.equal(additionSum.secondOperand, 5);
    t.equal(additionSum.result, 15);
    t.end();
});

test('creates an subtraction sum', function (t) {
    t.equal(subtractionSum.firstOperand, 10);
    t.equal(subtractionSum.secondOperand, 5);
    t.equal(subtractionSum.result, 5);
    t.end();
});

test('creates an multiplication sum', function (t) {
    t.equal(multiplicationSum.firstOperand, 10);
    t.equal(multiplicationSum.secondOperand, 5);
    t.equal(multiplicationSum.result, 50);
    t.end();
});

test('creates an division sum', function (t) {
    t.equal(divisionSum.firstOperand, 10);
    t.equal(divisionSum.secondOperand, 5);
    t.equal(divisionSum.result, 2);
    t.end();
});
