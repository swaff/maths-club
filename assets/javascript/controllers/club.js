
module.exports = ['$routeParams', '$http', '$interval', 'SumHelper', 'QuizTimer', function ($routeParams, $http, $interval, SumHelper, QuizTimer) {

    this.number = $routeParams.number;
    this.sums = [];
    this.result = {};
    this.hasStarted = false;
    this.hasFinished = false;

    $http.get(`/api/sums?number=${this.number}`)
        .success((data) => {
            this.sums = data.sums.map(SumHelper.decorateSum);
        });

    this.start = () => {
        this.hasStarted = true;
        QuizTimer.start(this.finish);
    };

    this.finish = () => {
        QuizTimer.cancel();
        this.hasFinished = true;
        this.result = SumHelper.getResult(this.sums);
    };

    this.shouldDisplaySums = () => {
        return this.hasStarted && !this.hasFinished;
    };
}];
