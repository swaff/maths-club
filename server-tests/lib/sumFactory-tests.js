var expect = require('chai').expect;
var lodash = require('lodash');

var sumFactory = require('../../server-dist/lib/sumFactory');

describe('sumFactory', function () {

    describe('addition', function () {

        var addition;

        beforeEach(function () {
            addition = sumFactory.addition();
        });

        it('returns an object', function () {
            expect(addition).to.be.an('object');
        });

        it('contains two numeric operands', function () {
            expect(addition.left).to.be.a('number');
            expect(addition.right).to.be.a('number');
        });

        it('the result is a value equal to left plus right', function () {
            expect(addition.left + addition.right).to.equal(addition.result);
        });

        it('describes its operator', function () {
            expect(addition.operator).to.equal('add');
        });
    });

    describe('subtraction', function () {

        var subtraction;

        beforeEach(function () {
            subtraction = sumFactory.subtraction();
        });

        it('returns an object', function () {
            expect(subtraction).to.be.an('object');
        });

        it('contains two numeric operands', function () {
            expect(subtraction.left).to.be.a('number');
            expect(subtraction.right).to.be.a('number');
        });

        it('the result is a value equal to left minus right', function () {
            expect(subtraction.left - subtraction.right).to.equal(subtraction.result);
        });

        it('the result is not negative', function () {
            expect(subtraction.result).to.be.at.least(0);
        });

        it('describes its operator', function () {
            expect(subtraction.operator).to.equal('subtract');
        });
    });

    describe('multiplication', function () {

        var multiplication;

        beforeEach(function () {
            multiplication = sumFactory.multiplication();
        });

        it('returns an object', function () {
            expect(multiplication).to.be.an('object');
        });

        it('contains two numeric operands', function () {
            expect(multiplication.left).to.be.a('number');
            expect(multiplication.right).to.be.a('number');
        });

        it('the result is a value equal to left multiplied by right', function () {
            expect(multiplication.left * multiplication.right).to.equal(multiplication.result);
        });

        it('describes its operator', function () {
            expect(multiplication.operator).to.equal('multiply');
        });
    });

    describe('division', function () {

        var division;

        beforeEach(function () {
            division = sumFactory.division();
        });

        it('returns an object', function () {
            expect(division).to.be.an('object');
        });

        it('contains two numeric operands', function () {
            expect(division.left).to.be.a('number');
            expect(division.right).to.be.a('number');
        });

        it('the result is a value equal to left divided by right', function () {
            expect(division.left / division.right).to.equal(division.result);
        });

        it('describes its operator', function () {
            expect(division.operator).to.equal('divide');
        });
    });
});
