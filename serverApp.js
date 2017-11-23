var angularApp = angular.module("app", ["highcharts-ng"]);

angularApp.controller("CryptoCntrl", ["$scope", "$http", "$interval", function($scope, $http, $interval) {


    $scope.graphData = [];
    $scope.chartConfig = {
        chart: {
            type: 'column',
            events: {
                load: function() {
                    // chart update set up each second
                    var series = this.series[0];
                    setInterval(function() {
                        $http({
                            url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
                            method: 'GET'
                        }).then(function(resp) {
                            console.log(resp.data);
                            angular.forEach(resp.data, function(value, key) {
                                var tempData = {};
                                tempData.name = value.name;
                                tempData.y = parseFloat(value.price_usd);
                                series.addPoint(tempData, true);
                            });
                        })
                    }, 2 * 60 * 1000);
                }
            }
        },
        xAxis: {
            type: 'category'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'data',
            colorByPoint: true,
            data: (function() {
                var t = [];
                $http({
                    url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
                    method: 'GET'
                }).then(function(resp) {
                    console.log(resp.data);
                    angular.forEach(resp.data, function(value, key) {
                        var tempData = {};
                        tempData.name = value.name;
                        tempData.y = parseFloat(value.price_usd);
                        t.push(tempData);
                    });
                })
                return t;
            }())
        }],
        title: {
            text: 'Crypto currencies exchange rate in USD',
            align: 'left',
            x: 70
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        }

    
    }


}]);