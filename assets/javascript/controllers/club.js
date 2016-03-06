const operatorMap = {
    addition: '+',
    subtraction: '-',
    multiplication: '×',
    division: '÷'
};

const decorateSum = (sum) => {
    sum.sign = operatorMap[sum.operator];
    return sum;
};

module.exports = ['$routeParams', '$http', function ($routeParams, $http) {

    this.number = $routeParams.number;
    this.sums = [];

    $http.get(`/api/sums?number=${this.number}`)
        .success((data) => {
            this.sums = data.sums.map(decorateSum);
        });

    this.hasStarted = false;
    this.start = () => this.hasStarted = true;

}];
