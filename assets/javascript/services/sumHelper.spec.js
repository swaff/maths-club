describe('services:sumHelper', function () {

    let sumHelperService;

    beforeEach(function() {

        angular.mock.module('mathsApp');

        angular.mock.inject(function (_SumHelper_) {
            sumHelperService = _SumHelper_;
        });
    });

    it('should exist', function() {
        expect(sumHelperService).toBeDefined();
    });

    describe('.decorateSum', function () {
        it('adds the correct sign to the sum object based on the operator', function () {

            const map = {
                addition: '+',
                subtraction: '-',
                multiplication: '×',
                division: '÷'
            };

            Object.keys(map).forEach(function (key) {
                const sum = { operator: key };
                const sign = sumHelperService.decorateSum(sum).sign;
                expect(sign).toBe(map[key]);
            });
        });
    });

    describe('.getResult', function () {

        let sums;
        let result;

        beforeEach(function () {
            sums = [
                { left: 5, operator: 'addition', right: 4, answer: 100, result: 9, sign: '+' },
                { left: 6, operator: 'multiplication', right: 4, answer: 24, result: 24, sign: '×' },
                { left: 1, operator: 'addition', right: 4, answer: 5, result: 5, sign: '+' }
            ];

            result = sumHelperService.getResult(sums);
        });

        it('has a created date', function () {
            expect(result.created).toBeDefined();
        });

        it('desribes the club using the number of sums', function () {
            expect(result.club).toBe(3);
        });

        it('assigns the number of correct answers', function () {
            expect(result.answers.correct.length).toBe(2);
        });

        it('assigns the number of incorrect answers', function () {
            expect(result.answers.incorrect.length).toBe(1);
        });

        it('returns the number of correct answers as the score', function () {
            expect(result.score()).toBe(2);
        });

        it('strips off the sign which is no longer needed', function () {
            expect(result.answers.correct[0].sign).toBeUndefined();
            expect(result.answers.incorrect[0].sign).toBeUndefined();
        });
    });
});
