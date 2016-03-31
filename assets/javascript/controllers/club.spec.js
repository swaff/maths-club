describe('controllers:Club', function () {

    const routeParams = {
        number: 35
    };

    const sumsResponse = {
        "sums":[
            {"left":100, "right":10, "result":10, "operator":"division"},
            {"left":111, "right":64, "result":47, "operator":"subtraction"},
            {"left":5,   "right":2,  "result":10, "operator":"multiplication"}
        ]
    };

    let QuizTimerService;
    let SumHelperService;
    let controller;
    let $httpBackend;

    beforeEach(angular.mock.module('mathsApp'));

    beforeEach(inject(function (_$controller_, _$httpBackend_) {
        const $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        QuizTimerService = {
            start: jasmine.createSpy('QuizTimer.start'),
            cancel: jasmine.createSpy('QuizTimer.cancel')
        };

        SumHelperService = {
            getResult: jasmine.createSpy('SumHelper.getResult'),
            decorateSum: (val) => val
        };

        SumHelperService.getResult.and.returnValue('result');

        $httpBackend.when('GET', '/api/sums?number=35').respond(sumsResponse);

        controller = $controller('ClubController', {
            $routeParams: routeParams,
            QuizTimer: QuizTimerService,
            SumHelper: SumHelperService
        });
    }));

    it('sets the number of sums', function () {
        expect(controller.number).toBe(routeParams.number);
    });

    it('has the expected initial values', function () {
        expect(controller.sums.length).toBe(0);
        expect(controller.result).toEqual({});
        expect(controller.hasStarted).toBe(false);
        expect(controller.hasFinished).toBe(false);
    });

    it('contacts the api using the expected club number', function () {
        $httpBackend.flush();
        expect(controller.sums.length).toBe(3);
    });

    describe('.start', function () {

        beforeEach(function () {
            controller.start();
        });

        it('sets hasStarted to true', function () {
            expect(controller.hasStarted).toBe(true);
        });

        it('calls the start function on the QuizTimer service', function () {
            expect(QuizTimerService.start).toHaveBeenCalled();
        });

        it('passes the finish function to QuizTimer.start as the callback', function () {
            expect(QuizTimerService.start).toHaveBeenCalledWith(controller.finish);
        });
    });

    describe('.finish', function () {

        beforeEach(function () {
            $httpBackend.flush();
            controller.finish();
        });

        it('cancels the timer', function () {
            expect(QuizTimerService.cancel).toHaveBeenCalled();
        });

        it('sets hasFinished to true', function () {
            expect(controller.hasFinished).toBe(true);
        });

        it('gets the result from the SumHelper service', function () {
            expect(SumHelperService.getResult).toHaveBeenCalledWith(controller.sums);
            expect(controller.result).toBe('result');
        });
    });

    describe('.shouldDisplaySums', function () {

        it('returns false if the quiz in not started', function () {
            expect(controller.shouldDisplaySums()).toBe(false);
        });

        it('returns true when the quiz is stated but not finished', function () {
            controller.start();
            expect(controller.shouldDisplaySums()).toBe(true);
        });

        it('returns false if the quiz is started, but then finishes', function () {
            controller.start();
            controller.finish();
            expect(controller.shouldDisplaySums()).toBe(false);
        });
    });
});
