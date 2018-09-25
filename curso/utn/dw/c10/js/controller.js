var app = angular.module("app", []);
app.controller("appCtrl", ["$scope", function($scope) {
    $scope.persona = {
        nombre: "Ernesto",
        casado: true
    }

    $scope.cambios = function() {
        $scope.persona.casado = !$scope.persona.casado;
    }

    $scope.alertar = function() {
        alert($scope.persona.nombre);
    }
}]);

app.controller("appCtrl2", ["$scope", function($scope) {
    $scope.animal = {
        nombre: "Vaca",
        tienecola: true
    }
}]);