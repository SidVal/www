angular.module("clase10srv", [])
    .factory("appService", function($http) {
        var srvAPI = {};

        srvAPI.getConductores = function() {
            return $http({
                method: "GET",
                url: "http://ergast.com/api/f1/2017/driverStandings.json"
            });
        }

        return srvAPI;
    });