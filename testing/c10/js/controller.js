var myApp = angular.module('myApp', []); //módulo que se llama app, tengo que bindearlo en mi página con ng-app="app1"
myApp.controller("appCtrl", ["$scope", function($scope) {
    
    $scope.persona = {
        nombre : "Pedro",
        casado : true
    }

    $scope.cambios = function(){
        $scope.persona.casado = !$scope.persona.casado;
    }
}]);