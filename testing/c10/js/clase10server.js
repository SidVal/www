angular.module("clase10server", []) //tiene el módulo referenciado en clase10controller.js
    .factory("appService", function ($http) {
        var srvAPI = {};

        srvAPI.getConductores = function () {
            return $http({
                method: "GET",
                url: "http://ergast.com/api/f1/2017/driverStandings.json"
            });
        }

        return srvAPI;
    })