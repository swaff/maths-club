const padLeft = (value) => {
    return value > 9 ? value : "0" + value;
};

const getMinutes = (value) => padLeft(Math.floor(value / 1000 / 60));
const getSeconds = (value) => padLeft(Math.floor(value / 1000 % 60));
const getFormattedTime = (mins, secs) => `${mins}:${secs}`;

module.exports = ['$interval', '$rootScope', function ($interval, $rootScope) {

    let startTime;
    let elapsedTime;
    let onFinish;
    let timer;

    const timeLimit = 1000 * 60 * 10;

    const onTick = () => {
        elapsedTime = Date.now() - startTime;
        $rootScope.$emit('quizTimer.change');

        if (elapsedTime > timeLimit) {
            finish();
        }
    };

    const start = (onFinishCallback) => {
        onFinish = onFinishCallback;
        startTime = Date.now();
        timer = $interval(onTick, 200);
    };

    const finish = () => {
        $interval.cancel(timer);
        onFinish();
    };

    const cancel = () => $interval.cancel(timer);

    const getRemainingTimePercentage = () => elapsedTime / timeLimit * 100;

    const getElapsedTime = () => getFormattedTime(getMinutes(elapsedTime), getSeconds(elapsedTime));

    const getRemainingTime = () => {
        const remaining = timeLimit - elapsedTime;
        return getFormattedTime(getMinutes(remaining), getSeconds(remaining));
    };

    return {
        start,
        finish,
        cancel,
        getRemainingTimePercentage,
        getElapsedTime,
        getRemainingTime
    };
}];
