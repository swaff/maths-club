describe('controllers:QuizTimer', function () {

    let controller;
    let quizTimerService;
    let rootScope;
    const CHANGE_EVENT = 'quizTimer.change';

    beforeEach(angular.mock.module('mathsApp', function ($provide) {
        quizTimerService = {
            getElapsedTime: () => 1,
            getRemainingTime: () => 2,
            getRemainingTimePercentage: () => 3
        };

        $provide.value('quizTimer', quizTimerService);
    }));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        const $controller = _$controller_;
        rootScope = _$rootScope_;

        spyOn(rootScope, '$on').and.callThrough();

        controller = $controller('QuizTimerController', {
            $rootScope: rootScope,
            QuizTimer: quizTimerService
        });
    }));

    it('configures root scope to listen to quizTimer.change', function () {
        expect(rootScope.$on).toHaveBeenCalledWith(CHANGE_EVENT, jasmine.any(Function));
    });

    it('sets the controllers model when the event fires', function () {
        rootScope.$emit(CHANGE_EVENT);
        expect(controller.elapsedTime).toBe(quizTimerService.getElapsedTime());
        expect(controller.remainingTime).toBe(quizTimerService.getRemainingTime());
        expect(controller.timeRemainingPercentage).toBe(quizTimerService.getRemainingTimePercentage());
    });
});
