var app = angular.module("clase10app", ["clase10server"]);

app.controller("appCtrl", function ($scope, appService) {
    $scope.inicializar = function () {
        $scope.carreras = 0;
        $scope.conductores = [];
        $scope.pageSize = 5;
        $scope.pageCount = 0;
        $scope.currentPage = 0;
        $scope.order = "";
        $scope.reverse = false;
        $scope.itemsPage = [{
                value: 5,
                label: "5 items"
            },
            {
                value: 5,
                label: "10 items"
            },
            {
                value: 5,
                label: "50 items"
            },
        ];
        $scope.pages = [];
    }

    appService.getConductores()

        .then(function (response) {
            if (response.status == 200) {
                $scope.conductores = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                $scope.carreras = response.data.MRData.total;
            } else {
                alert("Hubo errores " + response.statusText);
            }
        })
        .catch(function (error) {
            alert(error);
        });
});