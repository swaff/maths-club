describe('directives:quizTime', function () {

    let compile;
    let rootScope;

    beforeEach(angular.mock.module('javascript/partials/quiz-timer.html'));
    beforeEach(angular.mock.module('mathsApp'));
    beforeEach(inject(function($compile, $rootScope, $templateCache) {
        compile = $compile;
        rootScope = $rootScope;
    }));

    it('generates the appropriate HTML', function() {
        var scope = rootScope.$new();
        scope.quizTimer = {
            elapsedTime: '01:23'
        };

        scope.remainingTime = 'mark';

        var element = compile('<quiz-time></quiz-time>')(scope);
        scope.$digest();
        console.log(element.controller);

        console.log(element.html());
    });
});
