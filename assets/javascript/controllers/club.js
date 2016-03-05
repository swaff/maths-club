module.exports = ['$routeParams', '$http', function ($routeParams, $http) {

    this.number = $routeParams.number;

    $http.get(`/api/sums?number=${this.number}`)
        .success((data) => this.sums = data.sums);

    this.hasStarted = false;
    this.start = () => this.hasStarted = true;

}];
