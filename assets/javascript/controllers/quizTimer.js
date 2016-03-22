module.exports = ['$rootScope', 'QuizTimer', function ($rootScope, QuizTimer) {

    $rootScope.$on('quizTimer.change', () => {
        this.elapsedTime = QuizTimer.getElapsedTime();
        this.remainingTime = QuizTimer.getRemainingTime();
        this.timeRemainingPercentage = QuizTimer.getRemainingTimePercentage();
    });
}];
