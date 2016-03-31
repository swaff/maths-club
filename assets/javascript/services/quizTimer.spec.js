describe('services:quizTimer', function () {

    let quizTimerService;
    let $interval;

    beforeEach(function() {

        angular.mock.module('mathsApp', function ($provide) {
            $interval = jasmine.createSpy('interval');
            $interval.cancel = jasmine.createSpy('cancel');
            $provide.value('$interval', $interval);
        });

        angular.mock.inject(function (_QuizTimer_) {
            quizTimerService = _QuizTimer_;
        });
    });

    describe('.start', function () {
        it('starts the timer', function () {
            quizTimerService.start();
            expect($interval).toHaveBeenCalled();
        });
    });

    describe('.onFinish', function () {

        let finishCallback;

        beforeEach(function () {
            finishCallback = jasmine.createSpy();
            quizTimerService.start(finishCallback);
            quizTimerService.finish();
        });

        it('cancels the timer', function () {
            expect($interval.cancel).toHaveBeenCalled();
        });

        it('calls the callback passed to start', function () {
            expect(finishCallback).toHaveBeenCalled();
        });
    });
});
