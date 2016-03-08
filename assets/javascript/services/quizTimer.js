module.exports = ['$interval', function ($interval) {

    let startTime;
    let elapsedTime;
    let onFinish;
    let timer;

    const onTick = () => {
        elapsedTime = Date.now() - startTime;

        if (elapsedTime > 1000 * 60 * 10) {
            finish();
        }
    };

    const start = (onFinishCallback) => {
        onFinish = onFinishCallback;
        startTime = Date.now();
        timer = $interval(onTick, 400);
    };

    const finish = () => {
        $interval.cancel(timer);
        onFinish();
    };

    const cancel = () => $interval.cancel(timer);

    return { start, finish, cancel };
}];
