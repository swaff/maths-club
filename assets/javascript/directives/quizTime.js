module.exports = ['QuizTimer', function (QuizTimer) {
    return {
        restrict: 'E',
        controller: 'QuizTimerController',
        controllerAs: 'quizTimer',
        bindToController: true,
        templateUrl: 'javascript/partials/quiz-timer.html'
    };
}];
